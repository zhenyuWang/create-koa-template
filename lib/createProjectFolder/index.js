import path from "path"
import fs from "fs"
import validateProjectName from "validate-npm-package-name"
import inquirer from "inquirer"
import chalk from "chalk"
import rmdir from "../../utils/rmdir.js"
export default async function create(projectName) {
  // 判断是否是当前目录
  const inCurrent = projectName === "."
  // 获取当前目录
  const cwd = process.cwd()
  // 获取 name 如果是当前目录，获取当前目录名称，否则使用输入 projectName
  const name = inCurrent ? path.relative("../", cwd) : projectName
  // 获取目标路径
  const targetDir = path.resolve(cwd, projectName || ".")
  // 校验是不是有个有效的项目名
  const result = validateProjectName(name)
  // 如果无效，给出提示
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors &&
      result.errors.forEach((err) => {
        console.error(chalk.red.dim("Error: " + err))
      })
    result.warnings &&
      result.warnings.forEach((warn) => {
        console.error(chalk.red.dim("Warning: " + warn))
      })
    return false
  }
  // 如果目标路径文件夹已经存在
  if (fs.existsSync(targetDir)) {
    // 提示用户目录已存在，进行选择
    const { action } = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: `Target directory ${chalk.cyan(
          targetDir
        )} already exists. Pick an action:`,
        choices: [
          { name: "Overwrite", value: "overwrite" },
          { name: "Merge", value: "merge" },
          { name: "Cancel", value: false },
        ],
      },
    ])
    if (!action) return false
    // 如果选择覆盖
    if (action === "overwrite") {
      console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
      // 删除当前目录
      await rmdir(targetDir)
      console.log(`\nRemoved ${chalk.cyan(targetDir)} success!`)
      return {
        name,
        isMerge: false,
      }
      // 如果选择合并
    } else if (action === "merge") {
      // 尝试删除当前目录下的 indexe.js package.json
      const indexPath = `${targetDir}/index.js`
      const packagePath = `${targetDir}/package.json`
      if (fs.existsSync(indexPath)) {
        console.log(`\nRemoving ${chalk.cyan(targetDir + "index.js")}...`)
        await rmdir(indexPath)
        console.log(`\nRemoved ${chalk.cyan(targetDir + "index.js")} success.`)
      }
      if (fs.existsSync(packagePath)) {
        console.log(`\nRemoving ${chalk.cyan(targetDir + "package.json")}...`)
        await rmdir(packagePath)
        console.log(
          `\nRemoved ${chalk.cyan(targetDir + "package.json")} success.`
        )
      }
      return {
        name,
        isMerge: true,
      }
    } else {
      exit(1)
    }
  } else {
    return {
      name,
      isMerge: false,
    }
  }
}
