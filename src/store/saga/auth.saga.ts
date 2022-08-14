import axios, { AxiosResponse } from 'axios';
import { put, takeEvery } from 'redux-saga/effects'
import { API } from '../../config';
import { SIGNIN, signinFail, signinSuccess, SIGNUP, SignupAction, signupFail, signupSuccess } from '../actions/auth.actions';

function* handleSignup(action: SignupAction) {
    try {
        yield axios.post(`${API}/signup`, action.payload)
        yield put(signupSuccess())
    } catch (error) {
        yield put(signupFail(error.response.data.error))
    }
}

function* handleSignin(action: SignupAction) {
    try {
        let response:AxiosResponse =  yield axios.post(`${API}/signin`, action.payload)
        localStorage.setItem('jwt',JSON.stringify(response.data))
        yield put(signinSuccess())
    } catch (error) {
        yield put(signinFail(error.response.data.error))
    }
}

export default function* authSaga() {
    // 注册
    yield takeEvery(SIGNUP, handleSignup)
    // 登录
    yield takeEvery(SIGNIN, handleSignin)
}