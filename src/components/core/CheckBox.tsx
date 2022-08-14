import React, { FC, useEffect } from 'react'
import { List, Typography, Checkbox as AntCheckBox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../store/reducer/index';
import { CategoryState } from '../../store/reducer/category.reducer';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { getCategory } from '../../store/actions/category.actions';

const { Title } = Typography

interface Props {
    handleFilter: (arg: string[]) => void
}
const Checkbox: FC<Props> = ({ handleFilter }) => {
    const dispatch = useDispatch()
    const category = useSelector<IAppState, CategoryState>(state => state.category)

    useEffect(() => {
        dispatch(getCategory())
    }, [])

    const onChange = (checkedValue: CheckboxValueType[]) => {
        handleFilter(checkedValue as string[])
    }
    return (
        <>
            <Title level={4}>按照分类进行筛选</Title>
            <AntCheckBox.Group
                className='checkBoxFilter'
                options={category.category.result.map(item => ({
                    label: item.name,
                    value: item._id
                }))} onChange={onChange} />
        </>
    )
}

export default Checkbox