import * as React from 'react'
import './index.less'
const empty = 'https://hfw.sj56.com.cn/wxfiles/cbp/wxapp/empty.png'

interface EmptyProps {
  url?: string
  title?: string
}

const Empty = (props: EmptyProps) => {
  return (
    <div className="empty-content" style={{ padding: '100px 0' }}>
      <img src={props?.url || empty}></img>
      <p>{props?.title || '暂无数据'}</p>
    </div>
  )
}
export default Empty
