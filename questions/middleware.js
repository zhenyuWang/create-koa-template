export default () => {
  return {
    type: "checkbox",
    name: "middleware",
    message: "select middleware",
    choices: [
      {
        name: "koaRouter",
      },
      {
        name: "koaStatic",
      },
      {
        name: "koaBody",
      },
      {
        name: "koaViews",
      },
    ],
  }
}
