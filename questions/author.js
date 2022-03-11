export default () => {
  return {
    type: "input",
    name: "author",
    message: "set project author",
    default() {
      return ""
    },
  }
}
