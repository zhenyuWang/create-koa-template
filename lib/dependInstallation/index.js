import inquirer from "inquirer"
import { execa } from "execa"
import chalk from "chalk"

export default async (name, rootPath) => {
  const { packageManager } = await inquirer.prompt([
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

  await execa(packageManager, ["install"], {
    cwd: rootPath,
    stdio: [2, 2, 2],
  })

  console.log(`🎉  Successfully created project ${chalk.yellow(name)}.`)

  console.log(
    `👉  Get started with the following commands:\n\n` +
      chalk.cyan(` ${chalk.gray("$")} cd ${name}\n`) +
      chalk.cyan(` ${chalk.gray("$")} ${packageManager} run serve`)
  )
}
