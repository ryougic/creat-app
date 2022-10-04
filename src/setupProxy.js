//新版配置代码
const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
  app.use(
    createProxyMiddleware('/api1',{
      target:'https://reactapi.iynn.cn',
      changeOrigin:true,
      pathRewrite:{'^/api1':''}
    })
  )
}