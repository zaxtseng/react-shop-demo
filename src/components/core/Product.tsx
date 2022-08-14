import { Col, Row } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Layout from './Layout';
import ProductItem from './ProductItem';
import { IAppState } from '../../store/reducer/index';
import { ProductState } from '../../store/reducer/product.reducer';
import { useParams } from 'react-router-dom';

const Product = () => {

    const dispatch = useDispatch()

    const { product } = useSelector<IAppState,ProductState>(state => state.product)
    const { productId } = useParams<{productId: string}>()
  return (
    <Layout title='商品名称' subTitle='商品描述'>
        <Row>
            <Col>
                <ProductItem product={product.result} />
            </Col>
        </Row>
    </Layout>
  )
}

export default Product