/*
  @Author: lize
  @Date: 2021/7/2
  @Description : 
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/7/2
*/
import { MicroAcpMethodMap } from '@cbim/app-communication-protocol/lib/microApp'
import { GlobalStore } from '@cbim/app-communication-protocol/lib/globalStore'
import AppConfig from './appConfig'
import { ref } from 'vue'
const { __CBIM_PLATFORM_APPLICATION_BOOT_DATA__ } = window as any

let communicationProtocol = null

class CommunicationProtocol {
    options: mountProps
    mircoACP: MicroAcpMethodMap
    AppConfig: any = AppConfig
    globalStoreData: any = ref(null)
    globalStore: GlobalStore
    constructor(options?: mountProps) {
        this.options = options
        if (this.options) {
            this.Init()
        }
    }
    Init() {
        const { startMicroCbimAcp, globalStore } = this.options
        if (startMicroCbimAcp) {
            this.mircoACP = startMicroCbimAcp(__CBIM_PLATFORM_APPLICATION_BOOT_DATA__?.appCode || AppConfig.appCode)
        }
        if (globalStore) {
            this.globalStore = globalStore
            // 监听全局数据存储对象更新
            globalStore.onGlobalStoreChange(([newData, oldData]) => {
                this.globalStoreData.value = newData
            }, true)
        }
    }
    useApplication(appName: string, data?: any) {
        if (!this.mircoACP || !this.mircoACP.useApplication) return
        const targetConfig = this.AppConfig[appName]
        this.mircoACP.useApplication({
            appCode: targetConfig.appCode,
            menuCode: targetConfig.menuCode,
            payload: data
        })
    }
    logout() {
        if (!this.mircoACP || !this.mircoACP.logout) return
        this.mircoACP.logout()
    }
}
export { communicationProtocol }
export default {
    async install(Vue: any, options: any) {
        // eslint-disable-line
        Vue.config.globalProperties.$mountProps = options
        communicationProtocol = await new CommunicationProtocol(options)
    }
}
