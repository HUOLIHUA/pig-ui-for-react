import { loadStyle } from "./util";
const iconfontVerison = ['2980347_ah9i5t7ajrn']
const iconfontUrl = '//at.alicdn.com/t/font_$key.css'
iconfontVerison.forEach(item => {
  loadStyle(iconfontUrl.replace('$key', item))
})