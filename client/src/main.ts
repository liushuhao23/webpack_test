/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-09-26 16:25:25
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-11-11 21:22:57
 */
import './public-path'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import '@/assets/css/reset.css'
import '@cbim/design-system-antd-adapter/vue.less'
import '@cbim/design-system-variable/index.css'
import Antd from 'ant-design-vue'
import App from './App.vue'
import routes from './router'
import '@/assets/font/iconfont.css'
let instance: any = null
let router = null

/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
function render(props: mountProps = { container: '', registry: { activeRule: '' } }) {
    const { container, registry } = props
    const { __CBIM_PLATFORM_APPLICATION_BOOT_DATA__ } = window as any
    const base = registry && registry.activeRule ? registry.activeRule : __CBIM_PLATFORM_APPLICATION_BOOT_DATA__?.appRouter || ''
    // 在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
    router = createRouter({
        history: createWebHistory(base),
        routes
    })
    // 挂载应用
    instance = createApp(App)
    instance
        .use(router)
        .use(Antd)
        .mount(container ? (container as any).querySelector('#root') : '#root')
}
// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
    render()
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap(): Promise<any> {
    console.log('VueMicroApp bootstraped')
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: mountProps): Promise<any> {
    console.log('VueMicroApp mount', props)
    render(props)
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(): Promise<any> {
    console.log('VueMicroApp unmount')
    instance.unmount()
    // instance.$el.innerHTML = ''
    instance = null
    router = null
}
