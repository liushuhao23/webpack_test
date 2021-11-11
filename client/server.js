/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-11-11 22:54:31
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-11-11 23:40:08
 */
// "serve": "cross-env NODE_ENV=development webpack serve --config ./config/webpack.dev.conf.js",
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const Koa = require('koa')
const serve = require('koa-static')

const app = new Koa()
const config = require('./config/webpack.dev.conf')
const compiler = webpack(config)
console.log(compiler, 'compiler');

const devMiddleware = (compiler, opts) => {
    const middleware = webpackDevMiddleware(compiler, opts);
    return async (ctx, next) => {
        await middleware(ctx.req, {
            end: (content) => {
                ctx.body = content
            },
            setHeader: (name, value) => {
                ctx.set(name, value)
            }
        }, next)
    }
}

app.use(devMiddleware(compiler, {
    publicPath: config.output.publicPath
}))
console.log(__dirname + '/public', '545555')
app.use(serve(__dirname + '/public'))

app.listen(3000, () => {
    console.log('Example app listening on port 3000!\n');
});