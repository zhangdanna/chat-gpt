import xhr from 'axhr'
import { Message } from 'element-ui'

let apiUrl = ''
const apiBaseUrl = process.env.VUE_APP_BASE_API || '/'

xhr.getUrl = (option) => {
  if (option.baseUrl) {
    apiUrl = option.baseUrl + option.url
    return {
      baseUrl: option.baseUrl,
      url: option.url
    }
  }
  apiUrl = apiBaseUrl + option.url
  return {
    baseUrl: apiBaseUrl,
    url: option.url
  }
}

// IE接口缓存
xhr.baseData = {
  t: Date.now()
}

// 全局配置
xhr.defaultConfig = () => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8'
    // "X-Token": token,
  }
  return {
    timeout: 60000,
    withCredentials: true, // 允许携带cookie
    headers
  }
}

xhr.success = (response) => {
  const res = response
  let isSuccess = true
  // const location = window.location;

  if (typeof res !== 'object') {
    Message.error(`${apiUrl}: response data should be JSON`)
    isSuccess = false
  }

  // 接口返回不存在code, 即直接返回处理
  if (!res.code) return true

  switch (`${res.code}`) {
    case '200':
    case '000000':
      isSuccess = true
      break
    case '50103':
      Message.error(res.msg || 'unknown error')
      isSuccess = false
      break
    case '100006':
      Message.error(res.msg || 'unknown error')
      isSuccess = false
      break
    case '100013':
      Message.error(res.msg || 'unknown error')
      isSuccess = false
      break
    default:
      Message.error(res.msg || 'unknown error')
      isSuccess = false
  }

  return isSuccess
}

xhr.error = (err, isCancel) => {
  if (isCancel) {
    Message.error(err)
  } else {
    Message.error('服务器开小差了!')
    console.error('xhr error: ', err)
  }
  return err
}
