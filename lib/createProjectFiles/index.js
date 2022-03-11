// 1. 创建对应文件夹
import fs from "fs"
import createIndexTemplate from "./createIndexTemplate.js"
import createPackageTemplate from "./createPackageTemplate.js"
import dependInstallation from "../dependInstallation/index.js"

export default (config) => {
  // 如果目录不是 merge,需要创建目录
  if (!config.isMerge) fs.mkdirSync(config.name)
  // 2. 创建 index.js
  fs.writeFileSync(`./${config.name}/index.js`, createIndexTemplate(config))
  // 3. 创建 package.json
  fs.writeFileSync(
    `./${config.name}/package.json`,
    createPackageTemplate(config)
  )
  // 4. 安装依赖
  dependInstallation(config.name, `./${config.name}`)
}
