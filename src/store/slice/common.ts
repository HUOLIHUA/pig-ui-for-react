import { getStorage, setStorage } from "@/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState, SlideMenu } from "../type";

const initialState: CommonState = {
  inlineCollapsed: getStorage({ name: 'inlineCollapsed', type: 'sessionStorage' }),
  isLockScreen: getStorage({ name: 'isLockScreen', type: 'sessionStorage' }),
  lockScreenPasswod: getStorage({ name: 'lockScreenPasswod', type: 'sessionStorage' }),
  lockScreenPreviousMenu: getStorage({ name: 'lockScreenPreviousMenu', type: 'sessionStorage' })
}

const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {

    /**保存菜单折叠状态 */
    setInlineCollapsed(state, action: PayloadAction<boolean>) {
      state.inlineCollapsed = action.payload
      setStorage({ name: 'inlineCollapsed', content: state.inlineCollapsed, type: 'sessionStorage' })
    },

    /**保存锁屏状态 */
    setIsLockScreen(state, action: PayloadAction<boolean>) {
      state.isLockScreen = action.payload
      setStorage({ name: 'isLockScreen', content: state.isLockScreen, type: 'sessionStorage' })
    },
    /**保存锁屏密码 */
    setLockScreenPasswod(state, action: PayloadAction<string>) {
      state.lockScreenPasswod = action.payload
      setStorage({ name: 'lockScreenPasswod', content: state.lockScreenPasswod, type: 'sessionStorage' })
    },
    /**保存锁屏前菜单信息 */
    setLockScreenPreviousMenu(state, action: PayloadAction<SlideMenu>) {
      state.lockScreenPreviousMenu = action.payload
      setStorage({ name: 'lockScreenPreviousMenu', content: state.lockScreenPreviousMenu, type: 'sessionStorage' })
    }
  }
})

export const { setInlineCollapsed, setIsLockScreen, setLockScreenPasswod, setLockScreenPreviousMenu } = commonSlice.actions
export default commonSlice.reducer
