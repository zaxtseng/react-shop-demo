import { Button, Form, Input, Result } from 'antd'
import React from 'react'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux';
import { signin, SigninPayload } from '../../store/actions/auth.actions';
import { IAppState } from '../../store/reducer/index';
import { AuthState } from '../../store/reducer/auth.reducer';
import { isAuth } from '../../helpers/auth';
import { Jwt } from '../../store/models/auth';
import { Redirect } from 'react-router-dom';

const Signin = () => {
  const dispatch = useDispatch()
  const onFinish = (value: SigninPayload) => (
    dispatch(signin(value))
  )
  // 获取登录结果
  const auth = useSelector<IAppState,AuthState>(state => state.auth)
  // 登录失败,显示错误信息
  const showError = () => {
    if(auth.signin.loaded && !auth.signin.success){
      return (
        <Result
          status="warning"
          title="登录失败"
          subTitle={auth.signin.message}
        />
      )
    }
  }
  // 登录成功,根据角色跳转到对应管理页面
  const redirectToDashboard = () => {
    const auth = isAuth()
    if(auth) {
      const { user: {role}} = auth as Jwt

      if(role === 0) {
        // 注册用户
        return <Redirect to="/user/dashboard" />
      } else {
        return <Redirect to="admin/dashboard" />
      }
    }
  }
  // 表单抽离
  const signinForm = () => (
    <Form onFinish={onFinish}>
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
    <Layout title='登录' subTitle="Common">
      {showError()}
      {redirectToDashboard()}
      {signinForm()}
    </Layout>
  )
}

export default Signin