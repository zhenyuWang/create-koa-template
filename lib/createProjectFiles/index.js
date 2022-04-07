import fs from "fs"
import createIndexTemplate from "./createIndexTemplate.js"
import createPackageTemplate from "./createPackageTemplate.js"
import dependInstallation from "../dependInstallation/index.js"

export default (config) => {
  if (!config.isMerge) fs.mkdirSync(config.name)

  fs.writeFileSync(`./${config.name}/index.js`, createIndexTemplate(config))

  fs.writeFileSync(
    `./${config.name}/package.json`,
    createPackageTemplate(config)
  )

  dependInstallation(config.name, `./${config.name}`)
}
