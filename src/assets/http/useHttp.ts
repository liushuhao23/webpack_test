/*
  @Author: lize
  @Date: 2021/9/18
  @Description : 
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/9/18
*/
import appConfig from '@/assets/utils/appConfig'
const { __CBIM_PLATFORM_APPLICATION_BOOT_DATA__ } = window as any

export const settingHttpHeaders = (requestConfig: any, CommunicationProtocol: any) => {
    requestConfig.headers.entId =
        CommunicationProtocol?.globalStoreData.value?.workspace?.workspaceMetaData?.id || __CBIM_PLATFORM_APPLICATION_BOOT_DATA__.entId || ''
    requestConfig.headers.accountId =
        CommunicationProtocol?.globalStoreData.value?.workspace?.workspaceMetaData?.accountId || __CBIM_PLATFORM_APPLICATION_BOOT_DATA__.accountId || ''
    requestConfig.headers.appCode = appConfig.appCode
}
