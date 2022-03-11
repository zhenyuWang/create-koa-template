import fs from "fs"
import ejs from "ejs"
import prettier from "prettier"
export default function createIndexTemplate(config) {
  const templateCode = fs.readFileSync(
    "./lib/createProjectFiles/template/index.ejs"
  )
  const code = ejs.render(templateCode.toString(), config)
  return prettier.format(code, { parser: "babel" })
}
