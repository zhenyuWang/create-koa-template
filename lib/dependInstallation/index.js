import inquirer from "inquirer"
import { execa } from "execa"
import chalk from "chalk"
export default async (name, rootPath) => {
  // 与用户交互，选择包管理器
  let packageManager = await inquirer.prompt([
    {
      type: "list",
      name: "packageManager",
      message: "Pick the package manager to use when installing dependencies:",
      choices: [
        {
          name: "npm",
        },
        {
          name: "yarn",
        },
        {
          name: "pnpm",
        },
      ],
      default() {
        return "npm"
      },
    },
  ])
  // 获取用户选择的包管理器
  packageManager = packageManager.packageManager
  // 安装依赖
  await execa(packageManager, ["install"], {
    cwd: rootPath,
    stdio: [2, 2, 2],
  })
  // 提示项目创建成功
  console.log(`🎉  Successfully created project ${chalk.yellow(name)}.`)
  // 提示切换目录并启动服务
  console.log(
    `👉  Get started with the following commands:\n\n` +
      chalk.cyan(` ${chalk.gray("$")} cd ${name}\n`) +
      chalk.cyan(` ${chalk.gray("$")} ${packageManager} run serve`)
  )
}
