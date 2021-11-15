/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-11-12 09:16:03
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-11-15 21:39:23
 */
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const history = require('connect-history-api-fallback')

const app = express()
const config = require('./config/webpack.dev.conf')

const compiler = webpack(config)

app.use(history())

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        quiet: true,
        stats: 'errors-only'
    })
)
app.use(
    webpackHotMiddleware(compiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
        log: false
    })
)
// 将文件 serve 到 port 3000。
app.listen(3000, function () {
    console.log('app listening on port 3000!\n')
})
