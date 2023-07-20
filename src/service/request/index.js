import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config.js'
import router from '@/router/index.js'
import { messagePrompt } from '@/utils/messagePrompt.js'

// 封装axios
class Http {
    constructor(baseURL, timeout=10000) {
        this.instance = axios.create({
            baseURL,
            timeout
        })

        this.instance.interceptors.request.use(config => {
            const token = localStorage.getItem('token')
            if(token) config.headers.Authorization = `Bearer ${token}`
            return config
          }, err => {
            return Promise.reject(err)
          })

          this.instance.interceptors.response.use(res => {
            return res
          }, err => {
            if(err.response.status === 401) {
                messagePrompt('无效的token,请重新登录')
                localStorage.removeItem('token')
                router.push('/login')
            }
            return Promise.reject(err)
          })

        }

        request(config) {
            return new Promise((resolve, reject) => {
                this.instance.request(config).then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    
        get(config) {
            return this.request({ ...config, method: "get" })
        }
        
        post(config) {
            return this.request({ ...config, method: "post" })
        }
    
        delete(config) {
            return this.request({ ...config, method: "delete" })
        }
    
    
        patch(config) {
            return this.request({ ...config, method: "patch" })
        }
    }


    


export default new Http(BASE_URL, TIMEOUT)