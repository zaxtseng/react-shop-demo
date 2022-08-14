import { Col, Row, Typography } from 'antd'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from './Layout'
import ProductItem from './ProductItem'
import Search from './Search'
import { getProduct } from '../../store/actions/product.actions';
import { ProductState } from '../../store/reducer/product.reducer';
import { IAppState } from '../../store/reducer/index';

const { Title } = Typography

const Home: FC = () => {
  const dispatch = useDispatch()

  const { createdAt, sold } = useSelector<IAppState, ProductState>(state => state.product)
  useEffect(() => {
    dispatch(getProduct('createdAt'))
    dispatch(getProduct('sold'))
  }, [])


  return (
    <Layout title='商城' subTitle="慢慢看" >
      <Search />
      <Title level={5}>最新上架</Title>
      <Row gutter={[16, 16]}>
        {createdAt.products.map(item => (
          <Col span="6">
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
      <Title level={5}>最受欢迎</Title>
      <Row gutter={[16, 16]}>
      {sold.products.map(item => (
          <Col span="6">
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default Home