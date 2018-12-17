import * as actionTypes from './actionTypes';
import {signUp, login} from '../../axios-auth';

export const authStart = () => ({type: actionTypes.AUTH_START});
export const authFail = (err) => ({type: actionTypes.AUTH_FAIL, error: err.response.data.error});
export const authSuccess = (token, id) => ({
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: id
});

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {type: actionTypes.AUTH_LOGOUT};
};

export const checkTokenTimeout = (expiration) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiration * 1000)
    }
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const now = new Date();
            if (expirationDate <= now) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkTokenTimeout((expirationDate.getTime() - now.getTime()) / 1000));
            }
        } else {
            dispatch(logout());
        }
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
            const eDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', eDate);
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkTokenTimeout(res.data.expiresIn))
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error))
        })
};
