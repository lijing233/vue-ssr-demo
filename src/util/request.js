import axios from 'axios'
// import jsCookie from 'js-cookie'
import Message from '@/plugins/Message'

axios.defaults.withCredentials = true

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    console.log(`interceptors-request-error${error}`) // for debug
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  // 需添加与后端定义码值校验的操作
  response => {
    return response
  },
  error => {
    console.log(`interceptors-response-error${error}`) // for debug
    return Promise.resolve(error.response)
  }
)

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// 检查接口状态码
function checkStatus (response) {
  console.log(response)
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const errortext = codeMessage[response.status] || response.statusText
  Message(`网络异常 ${response.status}: ${errortext}`)
  const error = new Error(errortext)
  error.name = response.status
  error.response = response
  throw error
}

// 检查请求返回值
function checkCode (response) {
  if (response.data.code !== 200 && response.config.showErrToast) {
    Message(response.data)
    // const error = new Error(response.data.message)
    // error.name = response.data.code
    // error.response = response.data
    // throw error
  }
  return response
}

function errorCatch (error) {
  console.log('axios-error-catch', error)
  // console.log(error.response)
  // 未登录处理
  // const status = error.name
  // if (status === 101) {
  //   jsCookie.remove('token')
  //   jsCookie.remove('phone')
  //   window.location = '/login'
  // }
}

// axios默认值
// axios.defaults.baseURL = process.env.VUE_APP_BASE_API
axios.defaults.baseURL = ' https://www.easy-mock.com/mock/5a6586044e4c5c26414f5f6c/example'
axios.defaults.headers.common['Content-Type'] = 'application/json'
// axios.defaults.headers.common['token'] = jsCookie.get('token')

export default {
  post (url, params) {
    return axios({
      method: 'post',
      url: url,
      data: JSON.stringify(params)
    }).then(checkStatus).then(checkCode).catch(errorCatch)
  },
  get (url, params) {
    return axios({
      method: 'get',
      url: url,
      data: JSON.stringify(params)
    }).then(checkStatus).then(checkCode).catch(errorCatch)
  }
}
