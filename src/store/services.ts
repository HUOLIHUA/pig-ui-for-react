import { Get, Post } from "@/utils/request"
import { getStorage } from "@/utils/storage"
import { GetUserInfoResponse, LoginReponse, LoginRequest, SlideMenu, UserInfo } from "./type"

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

/**获取用户信息 */
export function fetchUserInfo() {
  return Get<GetUserInfoResponse>('/admin/user/info')
}

/**校验token令牌 */
export function fetchCheckToken() {
  const token = getStorage({ name: 'accessToken' })
  return Get('/auth/oauth/check_token', { token }, {
    isToken: false,
    headers: {
      Authorization: 'Basic cGlnOnBpZw=='
    }
  })
}

/**获取用户菜单 */
export function fetchMenu() {
  return Get<SlideMenu[]>('/admin/menu', { parent: -1 })
}