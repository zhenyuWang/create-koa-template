import fs from "fs"
import ejs from "ejs"
import prettier from "prettier"
export default function createPackageTemplate(config) {
  const templateCode = fs.readFileSync(
    "./lib/createProjectFiles/template/package.ejs"
  )
  const code = ejs.render(templateCode.toString(), config)
  return prettier.format(code, { parser: "json" })
}
