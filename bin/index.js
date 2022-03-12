#!/usr/bin/env node

import { Command } from "commander/esm.mjs"
import minimist from "minimist"
import chalk from "chalk"
import createProjectFolder from "../lib/createProjectFolder/index.js"
import getInputConfig from "../questions/index.js"
import createProjectFiles from "../lib/createProjectFiles/index.js"
import handleConfig from "../utils/handleConfig.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
const __dirname = fileURLToPath(import.meta.url)
// 获取 Command 实例
const program = new Command()
program
  .command("create <app-name>")
  .description("create a new Koa project by create-koa-template")
  .action(async (name) => {
    // 如果有多余参数，进行提示
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(
        chalk.yellow(
          "\n Info: You provided more than one argument. The first one will be used as the app's name, the rest are ignored."
        )
      )
    }
    // 调用 create 处理 project folder
    createProjectFolder(name).then(async (res) => {
      if (!res) return false
      const nameConfig = res
      // 目录处理成功后调用 getConfig 与用户交互并获取用户配置
      const config = await getInputConfig()
      createProjectFiles(handleConfig({ ...nameConfig, ...config }))
    })
  })
// 获取 package.json 内容
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../package.json"))
)
// 添加 -V 命令
program
  .version("create-koa-template ".concat(packageJson.version))
  .usage("<command> [options]")
program.parse()
