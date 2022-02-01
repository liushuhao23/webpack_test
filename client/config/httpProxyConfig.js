/*
 * @Description:配置代理
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-12-08 13:46:27
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-12-08 13:57:02
 */
const { createProxyMiddleware } = require('http-proxy-middleware')
const httpProxyConfig = (res, app) => {
    if (!Array.isArray(res)) {
        throw new Error('请传入正确的数组格式的参数')
    }
    res.forEach(item => {
        console.log(item)
        app.use(item.path, createProxyMiddleware({ target: item.target, changeOrigin: true }))
    })
}

module.exports = httpProxyConfig
