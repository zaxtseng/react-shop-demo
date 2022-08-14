import Layout from './Layout'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Col, Empty, Row, Space } from 'antd';
import RadioBox from './RadioBox';
import Checkbox from './Checkbox';
import { useDispatch } from 'react-redux';
import { filterProduct } from '../../store/actions/product.actions';
import { IAppState } from '../../store/reducer/index';
import { ProductState } from '../../store/reducer/product.reducer';
import ProductItem from './ProductItem';

const Shop: FC = () => {
  const product = useSelector<IAppState,ProductState>(state => state.product)

  interface FilterMode {
    category: string[]
    price: number[]
  }

  const [skip, setSkip] = useState<number>(0);

  const dispatch = useDispatch()
  const [myFilters, setMyFilter] = useState<FilterMode>({ category: [], price: [] });

  useEffect(() => {
    setSkip(0)
  }, [myFilters])

  useEffect(() => {
    dispatch(filterProduct({ filters: myFilters, skip }))
  }, [myFilters,skip])


  const filterDOM = () => (
    <Space size='middle' direction='vertical'>
      <Checkbox
        handleFilter={(filters: string[]) => {
          setMyFilter({ ...myFilters, category: filters })
        }} />
      <RadioBox
        handleFilter={(filters: number[]) => {
          setMyFilter({ ...myFilters, price: filters })
        }}
      />
    </Space>
  )

  const productDOM = () => (
    <Row gutter={[16,16]}>
      {product.filter.result.data.map(item => (
        <Col key={item._id} span="6">
          <ProductItem product={item} />
        </Col>
      ))}
    </Row>
  )

  const loadMore = () => {
    setSkip(skip + 4)
  }
  // 加载更多
  const loadMoreButton = () => (
    <Row>
      { product.filter.result.size >=4 && <Button onClick={loadMore}>加载更多</Button>}
    </Row>
  )
  // 数据为空
  const noData = () => (
    <Row>
      { product.filter.result.size =0 && <Empty />}
    </Row>
  )

  return (
    <Layout title='商城' subTitle="慢慢看">
      <Row>
        <Col span='4'>{filterDOM()}</Col>
        <Col span='20'>{productDOM()}{loadMoreButton()}{noData()}</Col>
      </Row>
    </Layout>
  )
}

export default Shop