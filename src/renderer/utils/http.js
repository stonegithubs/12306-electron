import axios from 'axios'
import Vue from 'vue'
import qs from 'querystring'

// 配置axios
axios.defaults.baseURL = 'https://kyfw.12306.cn'
axios.defaults.timeout = 16000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(config => {
  Vue.nprogress.start()

  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }

  return config
}, error => {
  Vue.nprogress.done()
  Vue.alert('请求出错拉>.<')

  return error
})

// 响应拦截器
axios.interceptors.response.use(res => {
  Vue.nprogress.done()

  return res.data
}, error => {
  Vue.nprogress.done()
  Vue.alert('发生错误了，再试一下>.<')

  return error
})

export default axios
