import { Get, Post } from '@/utils/request'
import { LoginReponse, LoginRequest } from './type'

/**获取验证码 */
export function fetchCode() {
  return Get<string>('/code', {}, { isToken: false, responseData: 'other' })
}

/**获取token */
export function fetchToken(options: LoginRequest) {
  return Post<LoginReponse>('/auth/oauth/token', options, {
    isToken: false,
    serialize: true,
    responseData: 'other',
    headers: {
      Authorization: 'Basic cGlnOnBpZw=='
    }
  })
}
