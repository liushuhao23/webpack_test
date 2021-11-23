/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-11-12 09:16:03
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-11-23 17:24:41
 */
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const history = require('connect-history-api-fallback')
const cors = require('cors')
// import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()
const config = require('./config/webpack.dev.conf')

const compiler = webpack(config)
// request.getHeader("Origin"));

app.use(cors({
    "origin": 'http://localhost:4000',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true
}))
app.use(history())
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        quiet: true,
        stats: 'errors-only',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
)
app.use(
    webpackHotMiddleware(compiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
        log: false
    })
)
// 将文件 serve 到 port 3001。
app.listen(3001, function () {
    console.log('app listening on port 3000!\n')
})
