import * as React from 'react'
import { Modal, Spin } from 'antd'
import Draggable from 'react-draggable'
import { ModalProps } from 'antd/lib/modal'
import { ReactNode, useState } from 'react'
import './index.less'

interface BasicModalProps extends ModalProps {
  title?: string | any
  width?: string | any // 宽度
  closeModel?: Function // 关闭的时候的方法
  children?: ReactNode
  cancelText?: string
  okText?: string
}

const BasicModal = (props: BasicModalProps) => {
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tip, setTip] = useState('加载中...')
  const { closeModel, onOk, children, title, className, okButtonProps, width, visible, cancelText, okText } = props
  const isReactElement: boolean = typeof children === 'object' && (children as object).hasOwnProperty('$$typeof')

  const handleCancel = () => {
    closeModel && closeModel(false)
    setLoading(false)
  }
  // 显示正在加载中或提交中的提示
  const showSpin = (tips: string = '加载中...') => {
    setLoading(true)
    setTip(tips)
  }
  // 关闭提示语
  const hideSpin = () => {
    setLoading(false)
  }
  const onMouseOver = () => {
    setDisabled(true)
  }
  const onMouseOut = () => {
    setDisabled(false)
  }
  const onOkHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onOk && onOk(e)
  }
  const modalProps = {
    keyboard: false,
    className: `${className} base-modal`,
    visible: visible,
    width: width || '500',
    onOk: onOkHandler,
    onCancel: handleCancel,
    cancelText: cancelText || '取消',
    okText: okText || '确认',
    modalRender: (modal: any) => <Draggable disabled={disabled}>{modal}</Draggable>,
    title: typeof title === 'string' ? <p className="basic-modal-title">{title}</p> : title
  }
  let child: [] = children as any
  let lastIndex = child.length
  const modalChildren = () => {
    return (
      <div>
        {child.slice(0, lastIndex - 1)}
        <div className="basic-modal">{child[lastIndex - 1]}</div>
      </div>
    )
  }
  return (
    <Modal {...props} {...modalProps} okButtonProps={{ disabled: loading, ...okButtonProps }}>
      <Spin spinning={loading} tip={tip}>
        <div className="base-modal-box" style={{ maxHeight: 500 }} onMouseOut={onMouseOut} onMouseOver={onMouseOver}>
          <div className="right_view"></div>
          {isReactElement ? children : modalChildren()}
        </div>
      </Spin>
    </Modal>
  )
}
export { BasicModal , BasicModalProps }