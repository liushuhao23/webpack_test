/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-03-27 22:39:53
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-10-25 17:24:35
 */

const { merge } = require('webpack-merge');
const base = require('./webpack.base.conf');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i, //匹配参与压缩的文件
        parallel: true, //使用多进程并发运行
        terserOptions: {
          //Terser 压缩配置
          output: { comments: false },
        },
        extractComments: true, //将注释剥离到单独的文件中
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      DEV: JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/bundle_[chunkhash:8].css',
    }),
  ],
});
