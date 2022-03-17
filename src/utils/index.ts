import { Method, AxiosRequestConfig, AxiosResponse } from 'axios'

export class JudgeUtil {
  static isEmptyObjOrArr = function (obj: any) {
    // 检验null和undefined
    if (!obj && obj !== 0 && obj !== '') {
      return true
    }
    // 检验数组
    if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
      return true
    }
    // 检验对象
    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
      return true
    }
    return false
  }
}

export interface AxiosResponseData {
  /** 错误类型 */
  error: string
  /** 错误码 */
  status: number
  /** 错误消息 */
  message: string
  /** 请求的路径 */
  path: string
  /** 请求的时间 */
  timestamp: string
}
/** 接口的定义 */
export interface URLInterface {
  /** 请求的类型 */
  type?: Method
  /** 请求的路径 */
  path: string
  [key: string]: any
}

export interface ServiceConfigProps {
  /** 服务名称 */
  name: string
  /** 请求头 */
  header: any
}

export interface DomainListProps {
  /** 域名 */
  domainName: string
  /** 请求头 */
  headerRequest?: any
  /** 服务名 */
  serviceName?: (string | ServiceConfigProps)[]
}

export interface RequestConfigProps {
  /** 基础的域名 */
  baseDomainName: string
  /** 基础的请求头 */
  baseHeader?: any
  /** 详细的配置 */
  domainList?: DomainListProps[]
}
/** 替换的参数的配置 */
export interface BaseReplaceURLConfig {
  /** 版本：v1 */
  version?: string
  /** 项目 */
  project?: string
}

/** 请求的配置 */
export interface RequestMethodProps {
  /** axios 请求的其他配置:请参考 axios 文档 */
  config?: AxiosRequestConfig
  /** 项目信息 */
  project?: string
  /** 请求头的信息 */
  headers?: any
  /** 取消重复请求： 默认false */
  cancelRepeatRequest?: boolean
  /** 其余的值 */
  [key: string]: any
}

export interface AxiosProps {
  /** 请求的域名等 */
  requestConfig: RequestConfigProps
  /** 当前的项目名称 */
  project?: string
  /** 超时的时间 */
  timeout?: number
  /**
   * 取消重复请求： 默认false 总的配置
   * * 请求的时候还有单个的配置
   */
  cancelRepeatRequest?: boolean
  /**
   * 自定义请求的接口中的值替换
   * ```
   * const baseReplaceURL = ({ path }:URLInterface, version:string = 'v1') => {
   *   let url = ''
   *   if (path.includes('{projectName}')) url = path.replace('{projectName}', ServerConfig.project)
   *   if (path.includes('{version}')) url = path.replace('{version}', version)
   *   return url
   * }
   * ```
   */
  replaceURL?: (url: URLInterface) => URLInterface
  /**
   * 返回动态的请求：比如token等
   */
  requestDynamicHeader?: () => any
  /**
   * 处理请求之后的数据
   * 状态处理等
   */
  handleResponseData?: (response: AxiosResponse, otherConfig?: RequestMethodProps, axios?: any) => Promise<any>
}