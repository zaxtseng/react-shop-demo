import React from 'react'
import { Col, Descriptions, Menu, Row, Typography } from 'antd'
import { Link } from 'react-router-dom';
import { isAuth } from '../../helpers/auth';
import { Jwt } from '../../store/models/auth';
import {
    ShoppingCartOutlined,
    UserOutlined,
    OrderedListOutlined
} from "@ant-design/icons"
import Layout from '../core/Layout';


const { Title } = Typography;

const AdminDashboard = () => {
    const { user: { name, email } } = isAuth() as Jwt
    // 左侧分类
    const adminLinks = () => {
        return (
            <>
                <Title level={5}>管理员链接</Title>
                <Menu>
                    <Menu.Item>
                        <ShoppingCartOutlined />
                        <Link to='/create/category'>添加分类</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <UserOutlined />
                        <Link to='/create/product'>添加产品</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <OrderedListOutlined />
                        <Link to=''>订单列表</Link>
                    </Menu.Item>
                </Menu>
            </>
        )
    }
    // 右侧管理员信息
    const adminInfo = () => (
        <Descriptions title="管理员信息" bordered>
            <Descriptions.Item label="昵称">{name}</Descriptions.Item>
            <Descriptions.Item label="邮件">{email}</Descriptions.Item>
            <Descriptions.Item label="角色">管理员</Descriptions.Item>
        </Descriptions>
    )

    return(
        <Layout title="管理员 Dashboard" subTitle="">
            <Row>
                <Col span="4">{adminLinks()}</Col>
                <Col span="20">{adminInfo()}</Col>
            </Row>
        </Layout>
    )
}

export default AdminDashboard