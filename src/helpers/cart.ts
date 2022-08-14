

/**
 * 将商品添加到购物车
 */


import { Product } from '../store/models/product';

export interface CartItem extends Product {
    count: number
}

export const addItem = (item: Product, next: () => void) => {
    let cart: CartItem[] = []

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart')!)
        }
        cart.push({
            ...item,
            count: 1
        })
    }
    // 去重后的购物车数组
    cart = Array.from(new Set(cart.map(item => item._id))).map(item => (
        cart.find(product => product._id === item)
    )) as CartItem[]
    // 处理好的数组再存在本地
    localStorage.setItem('cart', JSON.stringify(cart))

    next()
}

/**
 * 更改购物车数量
 */
export const updateItem = (productId: string,count: number) => {
    let cart: CartItem[] = []

    if(typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart')!)
    }
    cart.forEach((item,index) => {
        if(item._id === productId){
            cart[index].count = count
        }
    })
    localStorage.setItem('cart', JSON.stringify(cart))
}
    return cart

}
/**
 * 获取本地购物车数据
 */

 export const getCart = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart")!) as CartItem[]
      }
    }
    return []
  }
  

/**
 * 删除商品
 */

 export const deleteItem = (productId: string) => {
    let cart: CartItem[] = []

    if(typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart')!)
    }
    cart.forEach((item,index) => {
        if(item._id === productId){
            cart.splice(index,1)
        }
    })
    localStorage.setItem('cart', JSON.stringify(cart))
}
    return cart

}
