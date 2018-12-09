import * as actionTypes from './actionTypes';
import {signUp, login} from '../../axios-auth';
import axios from 'axios';

export const authStart = () => ({type: actionTypes.AUTH_START});
export const authFail = (err) => ({type: actionTypes.AUTH_FAIL, error: err.response.data.error});
export const authSuccess = (res) => ({
    type: actionTypes.AUTH_SUCCESS,
    token: res.data.idToken,
    userId: res.data.localId
});
export const logout = () => ({ type: actionTypes.AUTH_LOGOUT });

export const checkTokenTimeout = (expiration) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiration)
    }
};

export const setAuthRedirectPath = path => ({type: actionTypes.SET_AUTH_REDIRECT_PATH, path: path});

export const auth = (email, password, register) => dispatch => {
    console.log('Authenticate', dispatch);
    dispatch(authStart());
    let endpoint = register ? signUp : login;
    endpoint.post('', {
        email: email,
        password: password,
        returnSecureToken: true
    })
        .then(res => {
            console.log(res);
            dispatch(authSuccess(res));
            dispatch(checkTokenTimeout(res.data.expiresIn * 1000))
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error))
        })
};
