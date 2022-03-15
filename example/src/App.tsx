import React from '../../node_modules/react'
import '../../node_modules/antd/dist/antd.css'
import { Empty, BasicModal, DetailsModal, EditModal } from '../../lib'
import '../../lib/style/index.css'
import './index.less'
import { useState } from '../../node_modules/react'
import Descriptions from 'antd/lib/descriptions'
import Item from 'antd/lib/descriptions/Item'
const App = () => {
  // 基础弹窗显示隐藏
  const [visible, setVisible] = useState(false)
  // 详情弹窗显示隐藏
  const [detailVisible, setDetailVisible] = useState(false)
  // 编辑弹窗显示隐藏
  const [editVisible, setEditVisible] = useState(false)

  const openModal = () => {
    // setVisible(true)
    // setDetailVisible(true)
    setEditVisible(true)
  }
  const handlerOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // /** 点击确定按钮要执行的操作 */
    console.log('点击确定按钮')
    setVisible(false)
    setEditVisible(false)
  }
  const handlerClose = (visible: boolean) => {
    setVisible(visible)
    setDetailVisible(visible)
    setEditVisible(false)
  }
  return (
    <div>
      <span onClick={openModal} style={{ cursor: 'pointer' }}>打开</span>
      <Empty></Empty>
      <BasicModal width={600} title='Modal组件测试' onOk={handlerOk} closeModel={handlerClose} visible={visible}>
        <div>基础Modal测试</div>
      </BasicModal>
      <DetailsModal width={600} closeModel={handlerClose} visible={detailVisible} title='详情' >
        <Descriptions column={3}>
            <Item label="出库通知单号">{11}</Item>
            <Item label="出库类型">{22 || '/'}</Item>
            <Item label="状态">{33 || '/'}</Item>
            <Item label="联系人">{44 || '/'}</Item>
          </Descriptions>
      </DetailsModal>
      <EditModal width={600} closeModel={handlerClose} onOk={handlerOk} visible={editVisible} title="新增/编辑">
        <Descriptions column={3}>
            <Item label="出库通知单号">{11}</Item>
            <Item label="出库类型">{22 || '/'}</Item>
            <Item label="状态">{33 || '/'}</Item>
            <Item label="联系人">{44 || '/'}</Item>
          </Descriptions>
      </EditModal>
    </div>
  )
}

export default App
