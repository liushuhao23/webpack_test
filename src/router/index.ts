/*
 * @Description:路由文件
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-09-26 16:25:25
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-11-15 11:07:09
 */
import { RouteRecordRaw } from 'vue-router'
// import Home from '../views/Home.vue'
import Index from '../views/index.vue'
import testCom from '../views/testCom.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/testCom',
        name: 'testCom',
        component: testCom
    }
]

export default routes
