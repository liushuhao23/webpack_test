/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-12-08 10:50:24
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-12-08 13:45:50
 */
const devProxyOptions = [
    {
        path: '/api',
        target: 'http://localhost:3000',
        changeOrigin: true
    }
]
module.exports = devProxyOptions
