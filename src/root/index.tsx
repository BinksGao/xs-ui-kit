import * as React from 'react'
import { message, Modal } from 'antd'
import { FormInstance } from 'antd/lib/form'

const error = (msg: any, title?: string) => {
  Modal.error({
    title: title || '消息提示',
    centered: true,
    content: msg,
    onOk: () => Promise.resolve()
  })
}
const Info = (msg: any, title?: string) => {
  Modal.info({
    title: title || '消息提示',
    centered: true,
    content: msg,
    onOk: () => Promise.resolve()
  })
}
const warning = (msg: any, title?: string) => {
  Modal.warning({
    title: title || '消息提示',
    centered: true,
    content: msg,
    onOk: () => Promise.resolve()
  })
}
class RootComponent<P = {}, S = {}> extends React.Component<P, S>  {
  /** 消息的组件 */
  $message = message
  error = error
  Info = Info
  warning = warning
  formRef: React.RefObject<FormInstance> = React.createRef<FormInstance>()
}
export default RootComponent