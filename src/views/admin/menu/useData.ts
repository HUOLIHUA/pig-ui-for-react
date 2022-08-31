import { SlideMenu } from "@/store/type"
import { useRequest } from "ahooks"
import { message } from "antd"
import { useState } from "react"
import { fetchInsertMenu, fetchDeleteMenu, fetchMenuTree, fetchMenuInfo, fetchUpdateMenu } from "./service"
import { MenuForm } from "./type"

function useData() {
  const [visible, setVisible] = useState(false)
  const [currentId, setCurrentId] = useState<number>()

  /**获取菜单列表 */
  const { data, loading, refresh } = useRequest(() => fetchMenuTree({ lazy: false }))

  /**删除 */
  const { run: onDelMenu } = useRequest((id: number) => fetchDeleteMenu(id), {
    manual: true,
    onSuccess({ res }) {
      if (res) {
        message.success('操作成功')
        refresh()
      }
    }
  })

  /**添加、修改 */
  const onAddOrUpdate = (id?: number) => {
    setCurrentId(id)
    setVisible(true)
  }

  // const {run} = useRequest(() => {})
  return {
    list: data?.res,
    loading,
    visible,
    currentId,
    setVisible,
    refresh,
    onDelMenu,
    onAddOrUpdate
  }
}

export default useData