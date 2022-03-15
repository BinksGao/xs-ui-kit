import React from 'react'
import { Empty, Modal } from 'xs-ui-kit-alpha'
import 'antd/dist/antd.css'
const App = () => {
  return (
    <div className="App">
      <Empty></Empty>
      <Modal width={600} title={'查看详情'} visible={true}>
        <div>11111</div>
      </Modal>
    </div>
  )
}

export default App
