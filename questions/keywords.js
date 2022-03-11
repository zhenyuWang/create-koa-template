import chalk from "chalk"
export default () => {
  return {
    type: "input",
    name: "keywords",
    message: `set project keywords, ${chalk.gray("(use , to separate.)")}`,
    default() {
      return ""
    },
  }
}
