/*
  @Author: lize
  @Date: 2021/6/25
  @Description : 
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/6/25
*/
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Api from '@/assets/Api'
import { settingHttpHeaders } from './useHttp'
import { message } from 'ant-design-vue'
import { UtilsTools } from '../utils/utilsTools'
let CommunicationProtocol = null
const { __CBIM_PLATFORM_APPLICATION_BOOT_DATA__ } = window as any
const pix = __CBIM_PLATFORM_APPLICATION_BOOT_DATA__.serverHost || ''
const isDev = process.env.NODE_ENV === 'development'
const serviceValue = sessionStorage.getItem('serviceValue')
const suffix = isDev ? serviceValue || '' : ''
const productionUrl = 'http://bim.bj-big.com/delivery/api'

const Http = axios.create({
    baseURL: `${pix}${process.env.VUE_APP_API}${suffix}`, // api请求的baseURL
    timeout: 600000,
    withCredentials: true, // 允许跨域 cookie
    headers: {
        'Content-Type': 'application/json'
    },
    maxContentLength: 2000
})
// 请求拦截器
Http.interceptors.request.use(
    (config: any) => {
        if (
            process.env.NODE_ENV === 'production' &&
            (config.url === '/plan/view/ganttPlan' ||
                config.url === '/plan/view/get' ||
                config.url === '/plan/view/tree' ||
                config.url === '/plan/view/getPlanTime')
        ) {
            config.url = `${productionUrl}${config.url}`
        }
        settingHttpHeaders(config, CommunicationProtocol)
        return config
    },
    (err: AxiosRequestConfig) => Promise.reject(err)
)
Http.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            if (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer') {
                return new Promise(resolve => {
                    const result = UtilsTools.dealBlob(response)
                    result.then(data => {
                        if (!data.success) {
                            message.error(data.errMessage)
                        } else {
                            resolve(data)
                        }
                    })
                })
            }
            if (response.data.code === '802' || response.data.code === 802) {
                if (CommunicationProtocol && CommunicationProtocol.mircoACP) {
                    CommunicationProtocol.logout()
                } else {
                    window.location.href = `${response.data.errMessage}`
                }
                return
            }
            if (!response.data.success) {
                message.error(response.data.errMessage || '')
            }
            return response.data
        }
        if (response.status === 400) {
            message.error(response.data.errMessage || '')
            return
        }
    },
    (err: AxiosResponse) => {
        message.error('服务器错误，错误代码500！')
        Promise.reject(err)
        return { success: false }
    }
)
export { Http, Api }

export default {
    async install(app: any) {
        // eslint-disable-line
        app.config.globalProperties.$Http = Http
        app.config.globalProperties.$Api = Api
        const { communicationProtocol } = await import('../utils/CommunicationProtocol') // eslint-disable-line
        CommunicationProtocol = communicationProtocol
    }
}
