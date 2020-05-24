import { put, delay } from 'redux-saga/effects';

import { login, signUp } from "../../axios-auth";
import { authFail, authStart, authSuccess, logoutSucceed, logout, checkTokenTimeout } from "../actions";

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(logoutSucceed())
}

export function* checkTokenTimeoutSaga(action) {
    yield delay(action.expirationTime);
    yield put(logout())
}

export function* authenticateUserSaga(action) {
    const { register, email, password } = action;
    yield put(authStart());
    const endpoint = register ? signUp : login;
    try {
        const response = yield endpoint.post('', {
            email,
            password,
            returnSecureToken: true
        });
        const eDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', eDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(authSuccess(response.data.idToken, response.data.localId));
        yield put(checkTokenTimeout(response.data.expiresIn))
    } catch(error) {
        yield console.error(error);
        yield put(authFail(error))
    }
}