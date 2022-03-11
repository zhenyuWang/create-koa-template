export default () => {
  return {
    type: "input",
    name: "version",
    message: "set project version",
    default() {
      return "0.0.1"
    },
  }
}
