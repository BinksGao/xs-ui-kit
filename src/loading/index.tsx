import * as React from 'react'
import { Spin, Button } from 'antd'
import { LoadingComponentProps } from 'react-loadable'
import './index.less'

const Loading = (props: LoadingComponentProps) => {
  const { error, timedOut, pastDelay, isLoading } = props
  const reload = () => {
    window.location.reload()
  }
  if (error) {
    return (
      <div className="loading-content">
        <Button type="text" danger onClick={reload}>
          重新加载
        </Button>
      </div>
    )
  } else if (timedOut) {
    return (
      <div className="loading-content">
        <Button type="text" onClick={reload}>重新加载</Button>
      </div>
    )
  } else if (pastDelay || isLoading) {
    return (
      <div className="loading-content">
        <Spin size="large" className="loading-spin" tip="加载中..." />
      </div>
    )
  } else {
    return null
  }
}

export default Loading 
