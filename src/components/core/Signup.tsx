import { Button, Form, Input, Result } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetSignup, signup, SignupPayload } from '../../store/actions/auth.actions'
import Layout from './Layout'
import { AuthState } from '../../store/reducer/auth.reducer';
import { IAppState } from '../../store/reducer'
import { Link } from 'react-router-dom'

const Signup = () => {
  // 获取dispatch
  const dispatch = useDispatch()
  const onFinish = (value: SignupPayload) => {
    dispatch(signup(value))
  }
  const auth = useSelector<IAppState, AuthState>(state => state.auth)
  // 拿到antd提供的form实例对象
  const [form] = Form.useForm()

  // 1.注册成功,清空表单
  useEffect(() => {
    if (auth.signup.loaded && auth.signup.success) {
      form.resetFields()
    }
  }, [auth])

  // 2. 注册成功,显示成功信息
  const showSuccess = () => {
    if (auth.signup.loaded && auth.signup.success) {
      return (
        <Result
          status="success"
          title="注册成功"
          extra={[
            <Button type="primary">
              <Link to="/signin">登录</Link>
            </Button>
          ]}
        />
      )
    }
  }
  // 3. 注册失败,显示失败信息
  const showError = () => {
    if (auth.signup.loaded && !auth.signup.success) {
      return (
        <Result
          status="warning"
          title="注册失败"
        />
      )
    }
  }

  // 4. 离开页面,重置状态
  useEffect(() => {
    return () => {
      dispatch(resetSignup())
    }
  }, [])

  // 组件抽离
  const signupForm = () => (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name='name' label='昵称'>
        <Input />
      </Form.Item>
      <Form.Item name='password' label='密码'>
        <Input.Password />
      </Form.Item>
      <Form.Item name='email' label='邮箱'>
        <Input />
      </Form.Item>
      <Form.Item >
        <Button type='primary' htmlType='submit'>提交</Button>
      </Form.Item>
    </Form>
  )

  return (
    <Layout title='注册' subTitle="Common">
      {showSuccess()}
      {showError()}
      {signupForm()}
    </Layout>
  )
}

export default Signup