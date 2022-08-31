export interface UserState {
  /**用户权限列表 */
  permissions: string[];
  /**用户角色 */
  roles: string[];
  /**用户角色对应的菜单 */
  menu: SlideMenu[];
  /**当前菜单信息 */
  currentMenu: SlideMenu | undefined;
  /**用户信息 */
  userInfo: UserInfo | undefined;
  /**token */
  accessToken: string | undefined;
  /**刷新token */
  refreshToken: string | undefined;
}

export interface TagState {
  /**打开的路由标签 */
  tags: TagItem[]
}

export interface CommonState {
  /**菜单是否折叠 */
  inlineCollapsed?: boolean;
  /**是否已锁屏 */
  isLockScreen?: boolean;
  /**锁屏密码 */
  lockScreenPasswod?: string;
  /**锁屏之前显示的路由 */
  lockScreenPreviousMenu?: SlideMenu
}

export interface UserInfo {
  /**头像 */
  avatar: string,
  /**创建途径 */
  createBy: 'server' | 'client'
  /**创建时间 */
  createTime: string
  /**删除标志位 0：未删除， 1：已删除 */
  delFlag: "0" | '1'
  deptId: number
  lockFlag: string
  /**密码 */
  password: string
  /**手机号 */
  phone: string
  updateBy: 'server' | 'client'
  updateTime: string
  userId: number
  username: number
}

export interface SlideMenu {
  icon: string;
  id: number;
  /**是否缓存 */
  keepAlive: "0" | "1";
  label: string;
  name: string;
  /**父菜单id */
  parentId: number;
  path: string;
  /**排序，值越小越靠前 */
  sort: number
  /**0：菜单，1：按钮 */
  type: "0" | "1"
  children?: SlideMenu[]
  permission?: string[]
  weight?: number;
}

export interface TagItem {
  /**标题名称 */
  label: string;
  /**标题的路径 */
  path: string;
  /**关闭状态 */
  close?: boolean;
  /**标题的路径参数 */
  params?: string;
  /**标题的参数 */
  query?: string;
  /**分组 */
  group?: []
}

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

export interface GetUserInfoResponse {
  permissions: string[],
  roles: number[],
  sysUser: UserInfo
}