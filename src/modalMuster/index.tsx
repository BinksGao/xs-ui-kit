import React, { ReactNode } from 'react'
import { ModalProps } from 'antd/lib/modal'
import { BasicModal, BasicModalProps } from '../modal'
import './index.less'
interface EditModalProps extends BasicModalProps {
  tips?: string
}
export const DetailsModal = (props: EditModalProps, ref: any) => {
  const { title, footer } = props
  return (
    <BasicModal
      {...props}
      footer={footer || null}
      title={
        <div className="modal-edit">
          <span className="modal-title">{title || '查看详情'}</span>
        </div>
      }
    >
      {props.children}
    </BasicModal>
  )
}
export const EditModal = (props: EditModalProps, ref: any) => {
  const { title, maskClosable, tips, footer } = props
  return (
    <BasicModal
      {...props}
      maskClosable={maskClosable || false}
      footer={footer || null}
      title={
        <div className="modal-edit">
          <span className="modal-title">{title}</span>
          <span className="modal-tips">{tips !== undefined ? tips : '带*为必填项'}</span>
        </div>
      }
    >
      {props.children}
    </BasicModal>
  )
}