import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Divider, Form, Input, Row, Select } from 'antd'
import { getCategory } from '../../store/actions/category.actions';
import { IAppState } from '../../store/reducer/index';
import { CategoryState } from '../../store/reducer/category.reducer';
import { searchProduct } from '../../store/actions/product.actions';
import { ProductState } from '../../store/reducer/product.reducer';
import ProductItem from './ProductItem';

const Search = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategory())
    }, [])

    const { category } = useSelector<IAppState, CategoryState>(state => state.category)
    const { search } = useSelector<IAppState, ProductState>(
        state => state.product
    )

    const onFinish = (value: { category: string, search: string }) => {
        dispatch(searchProduct({ ...value }))
    }
    return (
        <>
            <Form onFinish={onFinish}>
                <Input.Group>
                    <Form.Item name='category'>
                        <Select>
                            <Select.Option value="All">所有分类</Select.Option>
                            {category.result.map(item => (
                                <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                            ))}
                        </Select>

                    </Form.Item>
                    <Form.Item name='search'>
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit'>搜索</Button>
                    </Form.Item>
                </Input.Group>
            </Form>
            <Divider />
            <Row gutter={[16, 16]}>
                {search.map(item => (
                    <Col span="6">
                        <ProductItem product={item} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Search