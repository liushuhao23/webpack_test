/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-03-25 09:59:06
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-10-29 18:07:10
 */
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const NODE_ENV = process.env.NODE_ENV;


module.exports ={
  mode: 'development',
  entry: path.resolve(__dirname, '../src/main.ts'),
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 不编译node_modules下的文件
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.vue$/,
        // exclude: /node_modules/, // 不编译node_modules下的文件
        use: ['vue-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/, // 不编译node_modules下的文件
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 指定特定的ts编译配置，为了区分脚本的ts配置
              configFile: path.resolve(__dirname, '../tsconfig.json'),
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/, // 不编译node_modules下的文件
        use: [
          NODE_ENV === 'development'
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
              },
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        // exclude: /node_modules/, // 不编译node_modules下的文件
        use: [
          NODE_ENV === 'development'
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
              },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true, //允许链式调用的换行
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // exclude: /node_modules/, // 不编译node_modules下的文件
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        // exclude: /node_modules/, // 不编译node_modules下的文件
        type: 'asset/resource',
      },
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm',
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new WebpackBar(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html',
      // minify: {
      //   collapseWhitespace: true, // 移除空格
      //   removeComments: true, // 移除注释
      // },
      title: 'webpack5+vue',
    }),
  ],
};
