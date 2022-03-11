export default () => {
  return {
    type: "input",
    name: "license",
    message: "set project license",
    default() {
      return "MIT"
    },
  }
}
