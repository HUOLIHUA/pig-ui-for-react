import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TagItem, TagState } from "../type";
import { welcomePage } from "@/config/web-setting";
import { getStorage, setStorage } from "@/utils/storage";

const initialState: TagState = {
  tags: getStorage({ name: 'tags', type: 'sessionStorage' }) || []
}

/**处理第一个标签 */
const setFirstTag = (tags: TagItem[]) => {
  if (tags.length === 1) {
    tags[0].close = false
  } else {
    tags.forEach(item => {
      if (item.path === welcomePage.path) {
        item.close = false
      } else {
        item.close = true
      }
    })
  }
}

/**菜单标签 */
const TagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    /**添加一个菜单标签 */
    insertTag(state, action: PayloadAction<TagItem>) {
      /**是否已存在该tag */
      const isAlreadyExist = state.tags.some(item => item.path === action.payload.path)
      if (!isAlreadyExist) {
        state.tags.push(action.payload)
        setFirstTag(state.tags)
        setStorage({ name: 'tags', content: state.tags, type: 'sessionStorage' })
      }

    },
    /**关闭一个菜单标签 */
    closeTag(state, action: PayloadAction<TagItem>) {
      state.tags = state.tags.filter(item => item.path !== action.payload.path)
      setFirstTag(state.tags)
      setStorage({ name: 'tags', content: state.tags, type: 'sessionStorage' })
    },

    /**关闭所有菜单标签 */
    closeAllTag(state, action: PayloadAction<TagItem>) {
      state.tags = [action.payload]
      setStorage({ name: 'tags', content: state.tags, type: 'sessionStorage' })
    },

    /**关闭其他标签 */
    closeOtherTag(state, action: PayloadAction<TagItem[]>) {
      state.tags = action.payload
      setStorage({ name: 'tags', content: state.tags, type: 'sessionStorage' })
    }
  }
})

export const { insertTag, closeTag, closeAllTag, closeOtherTag } = TagsSlice.actions

export default TagsSlice.reducer