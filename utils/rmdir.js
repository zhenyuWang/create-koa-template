import fs from "fs"

export default function rmdir(path) {
  return new Promise((resolve) => {
    if (fs.statSync(path).isDirectory()) {
      const files = fs.readdirSync(path)

      files.forEach((file) => {
        let currentPath = `${path}/${file}`
        if (fs.statSync(currentPath).isDirectory()) {
          rmdir(currentPath)
        } else {
          fs.unlinkSync(currentPath)
        }
      })

      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }
    resolve("success")
  })
}
