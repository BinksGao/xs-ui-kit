import React, { useEffect } from '../../node_modules/react'
import '../../node_modules/antd/dist/antd.css'
import { Empty, BasicModal, DetailsModal, EditModal, OperationTable } from '../../lib'
import Axios from '../../src/axios'
import '../../lib/style/index.css'
import './index.less'
import { useState } from '../../node_modules/react'
import Descriptions from 'antd/lib/descriptions'
import Item from 'antd/lib/descriptions/Item'
const App = () => {
  const authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXJyZW50VGltZU1pbGxpcyI6IjE2NDc0ODEyNDEwODUiLCJwcm9qZWN0TmFtZSI6IllEQyIsImFjY291bnQiOiIxNTYxODE1MjYzOSIsInBsYXRmb3JtIjoid2ViIn0.21PUsUxeGGjPS_MX7RBXrsixFctcItqSFRfLzZYDrBA'
  const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXJyZW50VGltZU1pbGxpcyI6IjE2NDc0ODEyNDEwODUiLCJwcm9qZWN0TmFtZSI6IllEQyIsImFjY291bnQiOiIxNTYxODE1MjYzOSIsInBsYXRmb3JtIjoid2ViIn0.21PUsUxeGGjPS_MX7RBXrsixFctcItqSFRfLzZYDrBA'
  const traceid = 'WebPage_2ef961c1-7d50-4e99-9eb9-a2cc1921ad52_1647422283453_14001545'
  const axios = new Axios({ requestConfig: { baseDomainName: 'https://wmst-api.sj56.com.cn', baseHeader: { token, traceid, platform: 'web', device: 'WebPage', authorization }}, project: 'ydc' })
  // 基础弹窗显示隐藏
  const [visible, setVisible] = useState(false)
  // 详情弹窗显示隐藏
  const [detailVisible, setDetailVisible] = useState(false)
  // 编辑弹窗显示隐藏
  const [editVisible, setEditVisible] = useState(false)
  // 操作日志表格
  const dataSource = [{
    id: 1,
    createUser: '1',
    createTime: '2022-03-15 13:15:16',
    remark: '1-1-1-1-1'
  }, {
    id: 2,
    createUser: '2',
    createTime: '2022-03-15 13:15:16',
    remark: '2-2-2-2-2'
  }]
  const openModal = () => {
    // setVisible(true)
    // setDetailVisible(true)
    setEditVisible(true)
  }
  const handlerOk = (e: any) => {
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
  useEffect(() => {
    axios.request({ path: 'mky/gateway/mky-wsm/admin/advanceManage/page/{projectName}', type: 'get' }).then(({ data, message }: any) => {
      console.log(data, 'data')
    })
  }, [])
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
      <OperationTable dataSource={dataSource}></OperationTable>
    </div>
  )
}

export default App
