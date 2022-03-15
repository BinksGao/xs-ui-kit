const fs = require('fs')
const path = require('path')
const componentDir = './src/components'
const cModuleNames = fs.readdirSync(path.resolve(componentDir))
const obtainComponentsName = cModuleNames.reduce((prev, name) => {
  if (name !== 'index.ts') {
    prev[name] = `${componentDir}/${name}/index.tsx`
  }
  return prev
}, {})
export default obtainComponentsName
