/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-12-06 13:51:50
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-12-06 13:53:53
 */
const a = {
    b: {
        name: 1
    },
    z: 'xxxx'
}
a.b = {}
console.log(JSON.stringify(a), 'node')
