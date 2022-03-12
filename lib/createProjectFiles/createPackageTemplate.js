import fs from "fs"
import ejs from "ejs"
import prettier from "prettier"
import path from "path"
import { fileURLToPath } from "url"
// 获取安装后当前地址
const __dirname = fileURLToPath(import.meta.url)
export default function createPackageTemplate(config) {
  // 读取 package.json 模板
  const templateCode = fs.readFileSync(
    path.resolve(__dirname, "../template/package.ejs")
  )
  // 传入参数，创建 package.json
  const code = ejs.render(templateCode.toString(), config)
  // 格式化
  return prettier.format(code, { parser: "json" })
}
