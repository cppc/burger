import * as actionTypes from './actionTypes';

export const authStart = () => ({type: actionTypes.AUTH_START});
export const authFail = (err) => ({type: actionTypes.AUTH_FAIL, error: err.response.data.error});
export const authSuccess = (token, id) => ({
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: id
});

export const logout = () => ({
    type: actionTypes.AUTH_INITIATE_LOGOUT
});

export const logoutSucceed = () => ({
    type: actionTypes.AUTH_LOGOUT
});

export const checkTokenTimeout = (expiration) => ({
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expiration * 1000
});

export const checkAuthState = () => ({
    type: actionTypes.AUTH_CHECK_STATE
});

export const setAuthRedirectPath = path => ({type: actionTypes.SET_AUTH_REDIRECT_PATH, path: path});

export const auth = (email, password, register) => ({
    type: actionTypes.AUTH_INITIATE,
    email,
    password,
    register
});
