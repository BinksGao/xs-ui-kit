/*
 * @Description: 操作日志表格
 * @Date: 2022-03-15 15:44:23
 * @LastEditTime: 2022-03-16 16:39:38
 */
import KeyValue from '@typings/global'
import { Row, Col, Button, Table } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import './index.less'
import { JudgeUtil } from '@utils/index'

interface OperationProps {
  columns?: any // 表头
  dataSource: KeyValue[] // 数据源
}
export const OperationTable = (props: OperationProps) => {
  const { columns, dataSource } = props
  const [isUp, setIsUp] = useState(false)

  const changeStatus = () => {
    setIsUp(!isUp)
  }
  const getColumns = () => {
    const columnArr: any = [
      {
        title: '序号',
        dataIndex: 'index',
        width: 80,
        render: (title: string, row: KeyValue, index: any) => {
          return <span>{index + 1}</span>
        }
      },
      { title: '操作人', dataIndex: 'createUser', key: 'createUser', width: 80, render: (text: string) => text || '/' },
      { title: '操作时间', dataIndex: 'createTime', key: 'createTime', width: 100, render: (text: string) => moment(text).format('YYYY-MM-DD HH:MM:ss') },
      { title: '操作结果', dataIndex: 'remark', key: 'remark', width: 80, render: (text: string) => text || '/' }
    ]
    return  !JudgeUtil.isEmptyObjOrArr(columns) ? columnArr.concat(columns) : columnArr
    return  columnArr
  }
  return (
    <div className="operate_list">
      <Row align="middle" justify="space-between" className="operate_list-header">
        <Col className="operate_list-title">操作日志</Col>
        <Col>
          <Button className="operate_list-btn" onClick={changeStatus} type="link">
            {isUp ? '收起' : '展开'}
          </Button>
        </Col>
      </Row>
      <div className={isUp ? 'operate_list-show' : 'operate_list-hide'}>
        <Table dataSource={dataSource} size="small" rowKey="id" columns={getColumns()} className="operate_table" pagination={false} />
      </div>
    </div>
  )
}
