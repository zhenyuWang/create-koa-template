import inquirer from "inquirer"
import port from "./port.js"
import license from "./license.js"
import author from "./author.js"
import keywords from "./keywords.js"
import version from "./version.js"
import description from "./description.js"
import middleware from "./middleware.js"

export default () => {
  return inquirer.prompt([
    port(),
    license(),
    author(),
    keywords(),
    version(),
    description(),
    middleware(),
  ])
}
