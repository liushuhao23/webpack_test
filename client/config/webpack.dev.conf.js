/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-03-27 22:39:53
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-11-11 22:55:56
 */

const { merge } = require('webpack-merge')
const base = require('./webpack.base.conf')
const webpack = require('webpack')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

module.exports = merge(
    base,
    {
        mode: 'development',
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
            // new webpack.DefinePlugin({
            //   DEV: JSON.stringify('dev'),
            // }),
        ]
    }
)
