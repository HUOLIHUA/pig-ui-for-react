import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { encryption } from '@/utils/util'
import { setStorage, getStorage, clearStorage } from '@/utils/storage'
import { fetchMenu, fetchToken, fetchUserInfo } from '../services'
import { AppDispatch } from '..'
import type { UserState, LoginRequest, UserInfo, SlideMenu } from '../type'
import { welcomePage } from '@/config/web-setting'
import { formatRoutes } from '@/router'

const initialState: UserState = {
  permissions: getStorage({ name: 'permissions' }) || [],
  userInfo: getStorage({ name: 'userInfo' }),
  roles: getStorage({ name: 'roles' }) || [],
  menu: getStorage({ name: 'menu' }) || [],
  currentMenu: getStorage({ name: 'currentMenu' }),
  accessToken: getStorage({ name: 'accessToken' }),
  refreshToken: getStorage({ name: 'refreshToken' })
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    /**设置用户权限 */
    setPermission(state, action: PayloadAction<string[]>) {
      state.permissions = action.payload
      setStorage({ name: 'permissions', content: state.permissions })
    },

    /**设置用户信息 */
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload
      setStorage({ name: 'userInfo', content: state.userInfo })
    },

    /**设置用户角色 */
    setRoles(state, action: PayloadAction<string[]>) {
      state.roles = action.payload
      setStorage({ name: 'roles', content: state.roles })
    },

    /**设置菜单 */
    setMenu(state, action: PayloadAction<SlideMenu[]>) {
      state.menu = action.payload
      setStorage({ name: 'menu', content: state.menu })
    },

    /**当前菜单的子菜单 */
    setCurrentMenu(state, action: PayloadAction<SlideMenu>) {
      state.currentMenu = action.payload
      setStorage({ name: 'currentMenu', content: state.currentMenu })
    },

    /**设置token */
    setToken(state, action) {
      state.accessToken = action.payload
      setStorage({ name: 'accessToken', content: state.accessToken })
    },

    /**设置刷新token */
    setRefreshToken(state, action) {
      state.refreshToken = action.payload
      setStorage({ name: 'refreshToken', content: state.refreshToken })
    },

    /**退出系统 */
    loginOut() {
      clearStorage({ type: 'sessionStorage' })
      clearStorage({ type: 'localStorage' })
    }
  }
})

export default UserSlice.reducer

export const { setPermission, setUserInfo, setRoles, setMenu, setCurrentMenu, setToken, setRefreshToken, loginOut } = UserSlice.actions

// 用户登录获取token
export const handleLogin = (params: LoginRequest) => {
  return async (dispatch: AppDispatch) => {
    // 密码加密
    const encryptionUser = encryption<LoginRequest>({
      data: params,
      key: 'thanks,pig4cloud',
      param: ['password']
    })
    const { res, err } = await fetchToken(encryptionUser)
    if (res) {
      dispatch(setToken(res.access_token))
      dispatch(setRefreshToken(res.refresh_token))
    }

    return { res, err }
  }
}

/**获取用户信息、获取菜单信息 */
export const queryUserInfo = () => {
  return async (dispatch: AppDispatch) => {

    const [{ res: userInfo }, { res: menuInfo }] = await Promise.all([fetchUserInfo(), fetchMenu()])
    if (userInfo) {
      dispatch(setPermission(userInfo.permissions))
      dispatch(setUserInfo(userInfo.sysUser))
    }
    if (menuInfo) {
      menuInfo.unshift(welcomePage)
      console.log('menuInfo', menuInfo)
      formatRoutes(menuInfo, true)
      dispatch(setMenu(menuInfo))
    }
    return { userInfo }
  }
}