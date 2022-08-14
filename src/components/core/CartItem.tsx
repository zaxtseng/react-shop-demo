import { Button, Input, Image } from 'antd'
import React, { ChangeEvent, FC, useState } from 'react'
import { API } from '../../config'
import { CartItem, deleteItem, updateItem } from '../../helpers/cart'

interface Props {
  product: CartItem
  setCart: (args: CartItem[]) => void
}
const CartItemFC: FC<Props> = ({ product, setCart }) => {
  const [count, setCount] = useState<number>(product.count);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCart(updateItem(product._id, count))
    setCount(count)
  }

  return (
    <tr className="ant-table-row">
      <td className="ant-table-cell">
        <Image width={120} src={`${API}/product/photo/${product._id}`} />
      </td>
      <td className="ant-table-cell">{product.name}</td>
      <td className="ant-table-cell">{product.price}</td>
      <td className="ant-table-cell">{product.category.name}</td>
      <td className="ant-table-cell">
        <Input type="number" value={count} onChange={handleChange} />
      </td>
      <td className="ant-table-cell">
        <Button
          danger
          type="primary"
          onClick={() => setCart(deleteItem(product._id))}
        >
          删除
        </Button>
      </td>
    </tr>
  )
}

export default CartItemFC