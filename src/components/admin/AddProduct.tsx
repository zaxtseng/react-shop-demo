import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Select, Upload } from 'antd'
import Layout from '../core/Layout'
import { UploadOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../store/actions/category.actions';
import { CategoryState } from '../../store/reducer/category.reducer';
import { IAppState } from '../../store/reducer';
import { RcFile } from 'antd/lib/upload';
import { isAuth } from '../../helpers/auth';
import { Jwt } from '../../store/models/auth';
import { API } from '../../config';
import axios from 'axios';


const AddProduct = () => {
  const [file, setFile] = useState<RcFile>()
  const { user, token } = isAuth() as Jwt

  const categoryData = useSelector<IAppState, CategoryState>(state => state.category)
  const onFinish = (product: any) => {
    //使用formData传递上传文件
    const formData = new FormData()
    for(let attr in product) {
      formData.set(attr,product[attr])
    }
    if(typeof file != 'undefined') {
      formData.set("photo", file)
    }
    axios.post(`${API}/product/create/${user._id}`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(() =>{
      message.success('商品添加成功')
    },
    () => {
      message.error("商品添加失败")
    })
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategory())
  }, [])

  // 抽离组件
  const addProductForm = () => {
    // 上传组件的属性
    const props = {
      accept: 'image/*',
      beforeUpload: function(file:RcFile){
        setFile(file)
        return false
      }
    }
    return (
      <Form onFinish={onFinish} initialValues={{ category: '' }}>
        <Form.Item>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>上传商品封面</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="name" label="商品名称">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="商品描述">
          <Input />
        </Form.Item>
        <Form.Item name="price" label="商品价格">
          <Input />
        </Form.Item>
        <Form.Item name="category" label="所属分类">
          <Select>
            <Select.Option value="">请选择分类</Select.Option>
            {categoryData.category.result.map(item => (
              <Select.Option key={item._id} value={item._id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="quantity" label="商品数量">
          <Input />
        </Form.Item>
        <Form.Item name="shipping" label="是否需要运输">
          <Select>
            <Select.Option value="1">是</Select.Option>
            <Select.Option value="0">否</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加商品
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <Layout title='添加产品' subTitle=''>
      {addProductForm()}
    </Layout>
  )
}

export default AddProduct