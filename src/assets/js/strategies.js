/*
 * @Description:策略模式
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-10-05 17:14:57
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-10-08 21:33:10
 */
import { message } from 'ant-design-vue'
const errObj = {
    obj: '请先选择数据对象',
    dataName: '请先选择数据名称'
}

const checkCallback = (data, type) => {
    if (!data) {
        message.error(errObj[type])
        throw new Error(errObj[type])
    }
}
const strategies = {
    objRole: data => {
        checkCallback(data, 'obj')
    },
    dataNameValue: data => {
        checkCallback(data, 'dataName')
    }
}
export { strategies }
