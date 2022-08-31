export interface LoginRequest {
  /**用户名 */
  username: string;
  /**密码 */
  password: string;
  /**验证码随机字符串 */
  randomStr: string;
  /**验证码值 */
  code: string;
  /**登录类型 */
  grant_type: 'password' | 'app' | 'refresh_token';
  scope: 'server'
}

export interface LoginReponse {
  /**token */
  access_token: string;
  /**客户端id */
  clientId: string;
  /**token刷新时间 */
  expires_in: number;
  license: string;
  /**刷新token */
  refresh_token: string;
  scope: string;
  token_type: string;
  user_info: {
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: { authority: string }[];
    credentialsNonExpired: boolean;
    deptId: number;
    enabled: boolean;
    id: number;
    password: null;
    username: string
  }
}