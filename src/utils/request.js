import xhr from 'axhr'

export function apiResolveCatch (err) {
  console.error('api error: ', err)
  // throw new Error(err)
}

export function apiPromiseCatch (fn) {
  return new Promise(fn).catch(apiResolveCatch)
}

export function delay (timer = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, timer)
  })
}

export function apiResolveCallback (data, err = false) {
  return {
    code: err ? '001' : '000',
    message: err ? 'fail' : 'success',
    data
  }
}

export function baseXHR (url, method, params) {
  const newParams = params
  return apiPromiseCatch((resolve, reject) => {
    xhr({
      url: url,
      type: method,
      data: newParams || {},
      success: (res) => {
        resolve(res)
      },
      error: (err) => {
        reject(err)
      }
    })
  })
}
export function formDataXHR (url, method, params, config) {
  return new Promise((resolve, reject) => {
    xhr({
      url: url,
      type: method,
      data: params || {},
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      config: config,
      success: (res) => {
        resolve(res)
      },
      error: (err) => {
        reject(err)
      }
    })
  })
}

export function formBaseXHR (url, method, params) {
  const newParams = params
  return apiPromiseCatch((resolve, reject) => {
    xhr({
      url: url,
      type: method,
      data: newParams || {},
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success: (res) => {
        resolve(res)
      },
      error: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * 下载
 * @param {*} response
 * @param {*} res
 * @param {*} filename
 */
export function downloadFun (response, res, filename) {
  const desc = response.headers['content-disposition']
  const fileName = desc.split('=').slice(1).join('')
  const currName = decodeURIComponent(fileName) || filename
  const contentType = response.headers['content-type']
  const blob = new Blob([res], { type: contentType })
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, currName)
  } else {
    const link = document.createElement('a')
    const evt = document.createEvent('HTMLEvents')
    evt.initEvent('click', false, false)
    link.href = URL.createObjectURL(blob)
    link.download = currName
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    window.URL.revokeObjectURL(link.href)
    link.remove()
  }
}
