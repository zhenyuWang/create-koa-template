import fs from "fs"
import ejs from "ejs"
import prettier from "prettier"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = fileURLToPath(import.meta.url)

export default function createIndexTemplate(config) {
  const templateCode = fs.readFileSync(
    path.resolve(__dirname, "../template/index.ejs")
  )

  const code = ejs.render(templateCode.toString(), config)

  return prettier.format(code, { parser: "babel" })
}
