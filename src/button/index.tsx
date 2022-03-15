import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import './index.less'
interface ButtonLinkProps extends LinkProps{
  /** 组件包裹的内容 */
  children?: any
  /** 样式 */
  style?: any
}
const ButtonLink = (props:ButtonLinkProps) => {
  return (
    <Link {...props}> {props.children}</Link>
  )
}

export default ButtonLink