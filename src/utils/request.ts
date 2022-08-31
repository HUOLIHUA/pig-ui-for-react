import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import { errorStatus, errorCode } from '@/config/error-code'
import { message } from 'antd'
import { getStorage } from './storage'
import { serialize as serializeFn } from './util'

const instance = axios.create({
  timeout: 30000,
  baseURL: '/api'
})

/** 设置token */
instance.interceptors.request.use((config: RequestConfig) => {
  // const { headers, isToken = true, url, serialize = false, method, ...resetConfig } = config
  config.isToken = config.isToken === undefined ? false : true
  if (config.headers && !config.isToken) {
    const accessToken = getStorage<string>({ name: 'accessToken' })
    config.headers['Authorization'] = 'Bearer ' + accessToken
  }

  /**有些post请求参数是放在url后面的 */
  if (config.serialize && config.method === 'post') {
    config.url = config.url + '?' + serializeFn(config.data)
  }

  return config
})

/**处理请求错误状态码 */
instance.interceptors.response.use(response => {
  return response
}, (error: AxiosError) => {
  const errorMessage = error.response ? errorStatus[String(error.response.status)] : errorStatus['default']
  message.error(errorMessage)
})

/**封装业务逻辑 */
async function request<T, P = false>(url: string, config: RequestConfig): Promise<ErrorWrap<ResponseData<T, P>>> {
  const { method = 'POST', data: requestParams, responseData = 'normal', ...resetConfig } = config
  const params = {
    url,
    method,
    [method === 'GET' ? 'params' : 'data']: requestParams,
    ...resetConfig
  }

  try {
    const { data } = await instance.request<Response<ResponseData<T, P>>>(params)
    const result = responseData === 'normal' ? data : formatResult<T>(data)
    /**处理业务状态码 */
    switch (result.code) {
      case errorCode.SUCCESS: {
        return { res: result.data }
      }
    }
    throw newError({ code: String(data.code), msg: data.msg })
  } catch (error: any) {
    // if (error.name == errorCode.ERROR) {
    //   message.error(error.message)
    // }
    message.error(error.message)
    return { err: error } as ErrorWrap<ResponseData<T, P>>;
  }
}

/**自定义错误 */
function newError(params: { code: string, msg: string }) {
  const e = new Error()
  e.name = params.code
  e.message = params.msg
  return e
}

/**处理不标准的返回值 */
function formatResult<T>(data: any) {
  return {
    code: 0,
    data: data as T,
    msg: ''
  } as any
}

function Post<T, P = false>(url: string, data: object = {}, config?: RequestConfig) {
  return request<T, P>(url, { method: 'POST', data, ...config });
}

function Get<T, P = false>(url: string, data?: object, config?: RequestConfig) {
  return request<T, P>(url, { method: 'GET', data, ...config });
}

function Delete<T, P = false>(url: string, data?: object, config?: RequestConfig) {
  return request<T, P>(url, { method: 'DELETE', data, ...config });
}

function Put<T, P = false>(url: string, data?: object, config?: RequestConfig) {
  return request<T, P>(url, { method: 'PUT', data, ...config });
}


export { Post, Get, Delete, Put }
export default request

interface Response<T> {
  /**业务状态码，0：成功， 1：失败 */
  code: 0 | 1;
  /**内容 */
  data: T,
  /**错误信息 */
  msg: string
}

interface PageReponse<T> {
  /**每页查询记录条数 */
  size: number;
  /**总记录 */
  total: number;
  /**当前页 */
  current: number;
  /**总页数 */
  pages: number;
  /**内容 */
  records: T[];
}

export type ErrorWrap<T> = { res?: T; err?: Error }

type ResponseData<T, P = false> = P extends true ? PageReponse<T> : T



type RequestWrapper<T, P, U = false> = U extends true ? T : Response<ResponseData<T, P>>

interface RequestConfig extends AxiosRequestConfig {
  /**是否需要token */
  isToken?: boolean;
  /**返回数据 */
  responseData?: 'normal' | 'other';
  /**是否序列化，序列化请求参数将放在url后面 */
  serialize?: boolean
}

