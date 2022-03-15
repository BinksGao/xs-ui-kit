### 基于React + Antd + Rollup的公共组件库封装

#### 编译
- npm run build or yarn build
- npm run watch or yarn watch

#### 发布
- npm run build or yarn build
- npm publish
- Notice
    - npm publish时需更改package.json中的version防止无法发布成

#### 本地测试
- npm run build or yarn build
- cd example
- 组件使用
```tsx
    import React from '../../node_modules/react' // 引入react
    import '../../node_modules/antd/dist/antd.css' // 引入antd的样式
    import { Empty, BasicModal, DetailsModal, EditModal } from '../../lib' // 引入本地编译后的组件
    import '../../lib/style/index.css' // 引入本地编译后的样式
    import './index.less' // 引入自己的样式
```
- 启动项目
    - npm run start or yarn start

#### npm包测试
- cd demo
- npm install xs-ui-kit-alpha
- 组件使用
```tsx
    import React from 'react' // 引入react
    import { Empty, Modal } from 'xs-ui-kit-alpha' // 引入对应的组件
    import 'antd/dist/antd.css' // 引入antd 防止样式丢失
```
- 启动项目
    - npm run start or yarn start