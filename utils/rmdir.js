import fs from "fs"
// 删除文件或文件夹
export default function rmdir(path) {
  return new Promise((resolve) => {
    // 如果当前路径是文件夹
    if (fs.statSync(path).isDirectory()) {
      // 删除下面的所有文件及文件夹
      const files = fs.readdirSync(path)
      files.forEach((file) => {
        let currentPath = `${path}/${file}`
        // 如果当前是文件夹，递归处理
        if (fs.statSync(currentPath).isDirectory()) {
          rmdir(currentPath)
        } else {
          // 否则删除文件
          fs.unlinkSync(currentPath)
        }
      })
      // 清空文件夹后删除文件夹
      fs.rmdirSync(path)
    } else {
      // 如果当前路径是文件，删除文件
      fs.unlinkSync(path)
    }
    resolve("success")
  })
}
