/*
 * @Description: 发布订阅模式
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-09-23 14:22:43
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-09-23 14:22:44
 */
class PubSub {
    constructor() {
        this.list = []
        this.data = []
    }
    add(name, fn) {
        if (!this.list[name]) {
            this.list[name] = [fn]
        } else {
            this.list[name].push(fn)
        }
    }
    publish(name, data) {
        let result = this.list[name]
        if (!result) {
            return false
        }
        result.forEach(item => {
            item.call(this, data)
        })
    }
}
let sub = new PubSub()
export { sub }
