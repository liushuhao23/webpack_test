/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-03-27 22:39:53
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-11-15 16:27:30
 */

const { merge } = require('webpack-merge')
const base = require('./webpack.base.conf')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const webpack = require('webpack')

module.exports = merge(base, {
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true', // 必须这么写，这将连接到服务器，以便在包重新构建时接收通知，然后相应地更新客户端
        './src/main.ts'
    ],
    // devServer: {
    //     static: {
    //         publicPath: '/'
    //     },
    //     // contentBase: path.resolve(__dirname, '../dist'),
    //     port: 8080,
    //     open: true,
    //     hot: true
    // },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
        // new webpack.DefinePlugin({
        //   DEV: JSON.stringify('dev'),
        // }),
    ]
})
