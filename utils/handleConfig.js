export default (config) => {
  let keywords = config.keywords.split(",")
  for (let i = 0; i < keywords.length; i++) {
    keywords[i] = `"${keywords[i]}"`
  }
  keywords = keywords.toString()

  function handleMiddlewareName(name) {
    return config.middleware.includes(name)
  }

  return {
    name: config.name,
    isMerge: config.isMerge,
    port: config.port,
    license: config.license,
    author: config.author,
    keywords,
    version: config.version,
    description: config.description,
    middleware: {
      router: handleMiddlewareName("koaRouter"),
      static: handleMiddlewareName("koaStatic"),
      views: handleMiddlewareName("koaBody"),
      body: handleMiddlewareName("koaViews"),
    },
  }
}
