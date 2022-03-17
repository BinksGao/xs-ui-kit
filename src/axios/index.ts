import axios, { AxiosResponse } from 'axios'
import {
    URLInterface, RequestMethodProps, RequestConfigProps, ServiceConfigProps,
    BaseReplaceURLConfig, DomainListProps, AxiosProps, AxiosResponseData
} from '@utils/index'
import qs from 'qs'

/** 请求接口中的参数的替换 */
const baseReplaceURL = ({ path, type }: URLInterface, { version = 'v1', project }: BaseReplaceURLConfig): URLInterface => {
    let url = path
    if (path.includes('{projectName}') && project) url = path.replace('{projectName}', project)
    if (path.includes('{version}') && version) url = path.replace('{version}', version)
    return { path: url, type }
}

/**
 * 根据接口中的服务名返回 请求的域名和header
 * @param {URLInterface} url 请求接口实体
 * @param {RequestConfigProps} requestConfig 请求的配置
 * @returns {{ baseURL, header }}
 */
const headerHandle = ({ path }: URLInterface, { baseDomainName, baseHeader, domainList }: RequestConfigProps): { baseURL: string, header: any } => {
    console.log('baseDomainName:', baseDomainName);
    console.log('baseHeader:', baseHeader);
    console.log('domainList:', domainList);
    // 请求的域名
    let domain: string | undefined
    let header: any
    if (domainList) {
        for (let index = 0; index < domainList.length; index++) {
            const dm: DomainListProps = domainList[index]
            if (!dm.serviceName) {
                continue
            } else {
                const service: string | ServiceConfigProps | undefined = dm.serviceName.find((sn: string | ServiceConfigProps) => {
                    return typeof sn === 'string' ? path.includes(sn) : path.includes(sn.name)
                })
                if (service) {
                    if (typeof service === 'string') {
                        header = dm.headerRequest
                        domain = dm.domainName
                    } else {
                        header = service.header || dm.headerRequest
                        domain = dm.domainName
                    }
                    break
                }
            }
        }
    }
    return {
        baseURL: domain || baseDomainName,
        header: header || baseHeader
    }
}

/** 请求错误的时候的处理 */
const responseError = (err: any) => {
    const { message, response } = err
    if (response) {
        const { status, config: { url } }: AxiosResponse<AxiosResponseData> = response
        err.code = status
        switch (status) {
            case 302: err.message = '接口重定向了！'; break
            case 400: err.message = '参数不正确！'; break
            case 401: err.message = '您未登录，或者登录已经超时，请先登录！'; break
            case 403: err.message = '您没有权限操作！'; break
            case 404: err.message = `请求路径不存在: ${url}`; break // 在正确域名下
            case 408: err.message = '请求超时！'; break
            case 409: err.message = '系统已存在相同数据！'; break
            case 500: err.message = '服务器内部错误！'; break
            case 501: err.message = '服务未实现！'; break
            case 502: err.message = '网关错误！'; break
            case 503: err.message = '服务不可用！'; break
            case 504: err.message = '服务暂时无法访问，请稍后再试！'; break
            case 505: err.message = 'HTTP版本不受支持！'; break
            default: err.message = '异常问题，请联系管理员！'; break
        }
    }
    if (message.includes('timeout')) {
        err.message = '网络请求超时！'
        err.code = 504
    }
    if (message.includes('Network')) {
        err.message = window.navigator.onLine ? '服务端异常！' : '您断网了！'
        err.code = -7
    }
    if (axios.isCancel(err)) { // 取消了重复请求
        return Promise.reject(err)
    } else {
        return err
    }
}

export default class Axios {
    constructor(config: AxiosProps) {
        this.axiosConfig = config
        this.instance = axios.create()
        this.init()
    }

    /** 新的请求实例 */
    private instance
    /** 请求的配置 */
    private axiosConfig: AxiosProps
    /** 存储每个请求的值 */
    private pendingMap = new Map()

    /**
     * 生成每个请求唯一的键
     * @param {*} config
     * @returns string
     */
    private getPendingKey = (config: any) => {
        let { url, method, params, data } = config
        if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
        return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
    }

    /**
     * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
     * @param {*} config
     */
    private addPending = (config: any) => {
        const pendingKey = this.getPendingKey(config)
        config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
            if (!this.pendingMap.has(pendingKey)) {
                this.pendingMap.set(pendingKey, cancel)
            }
        })
    }

    /**
     * 删除重复的请求
     * @param {*} config
     */
    private removePending = (config: any) => {
        const pendingKey = this.getPendingKey(config)
        if (this.pendingMap.has(pendingKey)) {
            const cancelToken = this.pendingMap.get(pendingKey)
            cancelToken(pendingKey)
            this.pendingMap.delete(pendingKey)
        }
    }

    private init() {
        const { cancelRepeatRequest: axiosCancel } = this.axiosConfig
        this.instance.interceptors.request.use((config) => {
            // 请求函数的 全局的
            const { cancelRepeatRequest: methCancel }: any = config.headers
            if (typeof methCancel === 'boolean' && !methCancel) {
                // 取消重复请求: 添加唯一的请求，存在 那么证明正在请求中，直接取消之前的请求 然后添加新的请求
                this.removePending(config)
                this.addPending(config)
            } else if (typeof methCancel === 'undefined' && ((typeof axiosCancel === 'boolean' && !axiosCancel) || !axiosCancel)) {
                // 取消重复请求: 添加唯一的请求，存在 那么证明正在请求中，直接取消之前的请求 然后添加新的请求
                this.removePending(config)
                this.addPending(config)
            }
            if (config.headers?.cancelRepeatRequest) delete config.headers.cancelRepeatRequest
            // 在发送请求之前做些什么
            return config
        })
        this.instance.interceptors.response.use((response: any) => {
            // 请求成成功之后取消当前的请求
            this.removePending(response.config)
            // 对返回的数据进行处理 获取正确的数据结构
            const {
                config: { responseType, headers: { authorization }, },
                data: { code, data, message }
            } = response
            console.log('1-1-1-1-1-1');
            console.log(authorization);
            if (responseType && responseType === 'blob') {
                return data
            } else {
                return { data, code, message }
            }
        }, (error: any) => {
            // 请求成成功之后取消当前的请求
            error.config && this.removePending(error.config)
            return responseError(error)
        })
    }

    /**
     * 发送请求
     * @param {URLInterface} url 接口
     * @param {*} params 参数
     * @param {RequestMethodProps} otherConfig 其余配置
     * @returns {Promise<any>}
     */
    request = (url: URLInterface, params: any = {}, otherConfig: RequestMethodProps = {}) => {
        const { instance, axiosConfig: { requestConfig, timeout, project, handleResponseData, requestDynamicHeader } } = this
        const { config, headers = {}, cancelRepeatRequest }: RequestMethodProps = otherConfig
        // 接口的修改配置等
        const { path, type = 'post' } = baseReplaceURL(url, { project: project })
        // 请求头的处理判断
        const { header = {}, baseURL } = headerHandle(url, requestConfig)
        const cusHeader = requestDynamicHeader ? requestDynamicHeader() : {}
        const responsePromise = instance.request({
            url: path,
            baseURL,
            method: type,
            data: /(post|POST)/.test(type) ? params : undefined, // post请求方式
            params: /(get|GET)/.test(type) ? params : undefined, // get 请求方式
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
            timeout: timeout,
            headers: { ...header, ...cusHeader, ...headers, cancelRepeatRequest },
            ...config
        })
        if (handleResponseData) {
            return new Promise((resolve, reject) => {
                responsePromise.then((response) => {
                    handleResponseData(response, otherConfig, this).then((res: any) => {
                        resolve(res)
                    }).catch((err) => {
                        reject(err)
                    })
                }).catch((err) => {
                    reject(err)
                })
            })
        }
        return responsePromise
    }

    /** 取消所有的请求 */
    onCancelRequestAll = () => {
        this.pendingMap.forEach((cancelToken: any, key: string) => {
            cancelToken(key)
            this.pendingMap.delete(key)
        })
    }
}
