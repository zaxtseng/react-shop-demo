import React, { useEffect, useState } from 'react'
import Layout from '../core/Layout'
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { API } from '../../config';
import { isAuth } from '../../helpers/auth';
import { Jwt } from '../../store/models/auth';
import { Link } from 'react-router-dom';

const AddCategory = () => {
  const [name, setName] = useState<string>("");
  const onFinish = (value: { name: string }) => {
    setName(value.name)
  }
  const {user, token} = isAuth() as Jwt
  useEffect(() => {
    async function addCategory() {
      try {
        let response = await axios.post<{name: string}>(`${API}/category/create/${user._id}`,{
          name
        },{
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        message.success(`[${response.data.name}] 添加成功`)
      } catch (error) {
        message.error(error.response.data.error)
      }
    }
    if(name) {
      addCategory()
    }
  }, [name])

  return (
    <Layout title='添加分类' subTitle=''>
      <Form onFinish={onFinish}>
        <Form.Item name='name'>
            <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>添加分类</Button>
        </Form.Item>
        <Button>
        <Link to="/admin/dashboard">返回 Dashboard</Link>
      </Button>
      </Form>
    </Layout>
  )
}

export default AddCategory