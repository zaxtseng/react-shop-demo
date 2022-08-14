import { put, takeEvery } from 'redux-saga/effects';
import { GET_PRODUCT, GetProductAction, getProductSuccess, SEARCH_PRODUCT, SearchProductAction, searchProductSuccess, FILTER_PRODUCT, FilterProductAction, filterProductSuccess } from '../actions/product.actions';
import { API } from '../../config';
import axios, { AxiosResponse } from 'axios';
import { Product } from '../models/product';

function* handleGetProduct({ sortBy, order, limit }: GetProductAction) {
    let response: AxiosResponse = yield axios.get<Product[]>(`${API}/products`, {
        params: { sortBy, order, limit }
    })
    yield put(getProductSuccess(response.data, sortBy))
}

function* handleSearchProduct({ payload: {
    search, category
} }: SearchProductAction) {
    let response: AxiosResponse = yield axios.get(`${API}/product/search`, {
        params: {
            search, category
        }
    })

    yield put(searchProductSuccess(response.data))
}

function* handleFilterProduct(action: FilterProductAction) {
    let response: AxiosResponse = yield axios.post(`${API}/products/filter`, action.payload)
    yield put(filterProductSuccess(response.data, action.payload.skip))
}
export default function* productSaga() {
    // 获取商品
    yield takeEvery(GET_PRODUCT, handleGetProduct)
    // 搜索
    yield takeEvery(SEARCH_PRODUCT, handleSearchProduct)
    // 筛选
    yield takeEvery(FILTER_PRODUCT, handleFilterProduct)
}