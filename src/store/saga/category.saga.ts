import { put, takeEvery } from "redux-saga/effects";
import { getCategorySuccess, GET_CATEGORY } from "../actions/category.actions";
import { API } from '../../config';
import { Category } from '../models/category';
import axios, { AxiosResponse } from "axios";


function* handleGetCategory() {
    let response:AxiosResponse = yield axios.get<Category[]>(`${API}/categories`)
    yield put(getCategorySuccess(response.data))
}
export default function* categorySaga() {
    //获取分类列表
    yield takeEvery(GET_CATEGORY, handleGetCategory)
}