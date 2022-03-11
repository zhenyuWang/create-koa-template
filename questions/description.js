export default () => {
  return {
    type: "input",
    name: "description",
    message: "set server project description",
    default() {
      return ""
    },
  }
}
