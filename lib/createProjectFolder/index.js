import path from "path"
import fs from "fs"
import validateProjectName from "validate-npm-package-name"
import inquirer from "inquirer"
import chalk from "chalk"
import rmdir from "../../utils/rmdir.js"

export default async function create(projectName) {
  const inCurrent = projectName === "."
  const cwd = process.cwd()
  const name = inCurrent ? path.relative("../", cwd) : projectName
  const targetDir = path.resolve(cwd, projectName || ".")
  const result = validateProjectName(name)

  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`))

    result.errors?.forEach((err) => {
      console.error(chalk.red.dim("Error: " + err))
    })

    result.warnings?.forEach((warn) => {
      console.error(chalk.red.dim("Warning: " + warn))
    })

    return false
  }

  if (!fs.existsSync(targetDir)) {
    return {
      name,
      isMerge: false,
    }
  }

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

  if (action === "overwrite") {
    emptyFolder(targetDir)
    return {
      name,
      isMerge: false,
    }
  }

  if (action === "merge") {
    handleBasedFiles(targetDir)
    return {
      name,
      isMerge: true,
    }
  }

  exit(1)
}

function emptyFolder(folder) {
  console.log(`\nRemoving ${chalk.cyan(folder)}...`)

  await rmdir(folder)

  console.log(`\nRemoved ${chalk.cyan(folder)} success!`)
}

function handleBasedFiles(targetDir) {
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

    console.log(`\nRemoved ${chalk.cyan(targetDir + "package.json")} success.`)
  }
}
