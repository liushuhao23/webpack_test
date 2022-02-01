import { Ref } from 'vue'
/*
 * @Description:表格方法
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-10-09 09:35:10
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-10-26 10:13:42
 */

/**
 * @description: 深拷贝数组依赖方法
 * @param {any} target
 * @return {*}
 * @author: liushuhao
 */
const checkoutType = (target: any): string => Object.prototype.toString.call(target).slice(8, -1)
/**
 * @description: 深拷贝数组依赖方法
 * @param {any} target
 * @return {*}
 * @author: liushuhao
 */
const isObj = (target: unknown) => {
    return typeof target === 'object' && target != null
}
/**
 * @description: 深拷贝数组3
 * @param {any} target
 * @param {*} hash
 * @return {*}
 * @author: liushuhao
 */
const deepClone = (target: any, hash = new WeakMap()): any => {
    if (!isObj(target)) return target
    if (hash.has(target)) return hash.get(target)

    let result: any

    if (checkoutType(target) === 'Object') {
        result = {}
    }
    if (checkoutType(target) === 'Array') {
        result = []
    }
    hash.set(target, result)

    Reflect.ownKeys(target).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            if (isObj(target[key])) {
                result[key] = deepClone(target[key], hash)
            } else {
                result[key] = target[key]
            }
        }
    })
    return result
}
/**
 * @description: 初始化假数据
 * @param {*} columns
 * @param {*} dataSource
 * @return {*}
 * @author: liushuhao
 */
const init = (columns, dataSource): any => {
    const columnsCopy = deepClone(columns.value)
    const dataSourceCopy = deepClone(dataSource.value)
    for (let i = 0; i < 8; i += 1) {
        columnsCopy.push({
            title: '行数据',
            dataIndex: 'title'
        })
        dataSourceCopy.push({
            id: '',
            title: '列数据'
        })
    }
    columnsCopy[0].title = ''
    return { columnsCopy, dataSourceCopy }
}
/**
 * @description:
 * @param {*} dataCheckData  行对象选中对象
 * @param {*} colList 列对象
 * @param {*} dataNameArr 行对象树形结构平铺成数组后的数据
 * @param {*} columns 表头数据
 * @param {*} dataSource 表格数据
 * @return {*}
 * @author: liushuhao
 */
const updateTable = (dataCheckData: Ref<any>, colList: Ref<any>, dataNameArr: Ref<any>, columns: Ref<any>, dataSource: Ref<any>) => {
    const dataCheckDataCopy = deepClone(dataCheckData.value)
    const colListCopy = deepClone(colList.value)
    const dataNameArrCopy = deepClone(dataNameArr.value)
    const columnsCopyUpdate = deepClone(columns.value)
    const dataSourceCopyUpdate = deepClone(dataSource.value)
    const oneItem: any = dataNameArrCopy.filter((item: any) => item.code === dataCheckDataCopy.code)[0]
    columnsCopyUpdate.length = 0
    dataSourceCopyUpdate.length = 0
    columnsCopyUpdate[0] = {
        title: oneItem.title,
        dataIndex: oneItem.code
    }
    if (colListCopy.length) {
        for (let i = 0; i < 6; i += 1) {
            dataSourceCopyUpdate.push({
                [oneItem.code]: oneItem.title + '(预览数据)'
            })
        }
        dataSourceCopyUpdate.forEach(item => {
            for (let i = 0; i < colListCopy.length; i += 1) {
                item[colListCopy[i].code] = colListCopy[i].title + '(预览数据)'
            }
        })
        colListCopy.forEach(item => {
            columnsCopyUpdate.push({
                title: item.title,
                dataIndex: item.code
            })
        })
    } else {
        for (let i = 0; i < 6; i += 1) {
            dataSourceCopyUpdate.push({
                [oneItem.code]: oneItem.title + '(预览数据)',
                key: oneItem.code
            })
        }
    }
    return { columnsCopyUpdate, dataSourceCopyUpdate }
}
/**
 * @description:右侧配置 左侧表单 展开收起
 * @param {*} configureFlag
 * @param {*} dom
 * @return {*}
 * @author: liushuhao
 */
const opneCloseFun = (configureFlag, dom) => {
    configureFlag.value = !configureFlag.value
    if (configureFlag.value) {
        dom.style.width = 'auto'
        dom.style.flex = '6'
    } else {
        dom.style.width = '100%'
        dom.style.flex = '0 1 auto'
    }
}
export { init, updateTable, opneCloseFun }
