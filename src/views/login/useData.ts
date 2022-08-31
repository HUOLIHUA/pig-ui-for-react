import { randomLenNum, encryption } from "@/utils/util"
import { useMount, useRequest } from "ahooks"
import { Form, message } from 'antd'
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store"
import { handleLogin, queryUserInfo } from "@/store/slice/user"
import { useHistory } from "react-router-dom"
import { welcomePage } from '@/config/web-setting'
import { insertTag } from "@/store/slice/tags"

interface LoginForm {
  /**用户名 */
  username: string;
  /**密码 */
  password: string;
  /**验证码值 */
  code: string;
  /**验证码随机字符串 */
  randomStr: string;
}

function useData() {
  const [code, setCode] = useState<{ codeUrl: string, randomStr: string }>()
  const [loginForm] = Form.useForm<LoginForm>()
  const history = useHistory()
  const dispatch = useAppDispatch()

  useMount(() => {
    refreshCode()
  })


  /**提交表单 */
  const onSubmit = async () => {
    const params = loginForm.getFieldsValue()
    params.randomStr = code!.randomStr
    const { res, err } = await dispatch(handleLogin({
      ...params,
      grant_type: 'password',
      scope: 'server'
    }))

    if (res) {
      const { userInfo } = await dispatch(queryUserInfo())
      if (userInfo) {
        history.replace(welcomePage.path)
        dispatch(insertTag({
          label: '首页',
          path: welcomePage.path
        }))
      }
      message.success('登录成功')
    }

    err && refreshCode()
  }

  /**获取验证码 */
  const refreshCode = () => {
    const randomStr = randomLenNum(4, true)
    setCode({
      codeUrl: `${window.location.origin}/api/code?randomStr=${randomStr}`,
      randomStr: randomStr
    })
  }

  return {
    code,
    loginForm,
    onSubmit,
    refreshCode
  }
}

export default useData