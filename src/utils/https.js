/* eslint-disable */

/**
 * axios 二次封装
 */
import axios from 'axios'
import qs from 'qs'
import Message from 'element-ui/packages/message'

axios.defaults.baseURL = 'http://30919ts958.picp.vip/check'
axios.defaults.timeout = 300000
/* axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest' */

//http request 拦截器
axios.interceptors.request.use(
  (config) => {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//响应拦截器即异常处理
axios.interceptors.response.use(
  (response) => {    
    if (response.data.code != '0') {      
      Message({        
        message: response.data.data || 'error',
        type: 'error'
      })
    }
    return response.data.code == 1000 ? null : response
  },
  (err) => {
    if (err && err.response) {
      let statusObj = {
        400: '错误请求',
        401: '未授权，请重新登录',
        403: '拒绝访问',
        404: '请求错误,未找到该资源',
        405: '请求方法未允许',
        408: '请求超时',
        500: '服务器端出错',
        501: '网络未实现',
        502: '网络错误',
        503: '服务不可用',
        504: '网络超时',
        505: 'http版本不支持该请求'
      }
      Message({
        message: statusObj[err.response.status] || `连接错误${err.response.status}`,
        type: 'error'
      })
    } else {
      console.log('连接到服务器失败或超时', err)
      Message({
        message: '连接到服务器失败或超时',
        type: 'error'
      })
    }
    return Promise.resolve(err.response)
  }
)

/**
 * 封装post请求
 * @param url
 * @param params
 * @returns {Promise}
 */

function post(url, params = {}, others) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params), {...others}).then(
      (response) => {
        if (!response) {
          reject('连接到服务器失败或超时')
          return
        }
        resolve(response.data)
      },
      (err) => {
        reject(err)
      }
    )
  })
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

function get(url, params = {}, others) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
        ...others
      })
      .then((response) => {
        if (!response) {
          reject('连接到服务器失败或超时')
          return
        }
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios.put(url, params)
            .then(res => {
                resolve(res.data);
                // Loading.service(true).close();
                //  Message({message: '请求成功', type: 'success'});
            })
            .catch(err => {
                reject(err.data)
                // Loading.service(true).close();
                Message({message: '加载失败', type: 'error'});
            })
    });
}
 
 
/**
 * delete
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function deletefn(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, params)
            .then(res => {
                resolve(res.data);
                // Loading.service(true).close();
                //  Message({message: '请求成功', type: 'success'});
            })
            .catch(err => {
                reject(err.data)
                // Loading.service(true).close();
                Message({message: '加载失败', type: 'error'});
            })
    });
}

export default {
  get,
  post,
  put,
  deletefn
}
