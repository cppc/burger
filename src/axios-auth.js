import axios from 'axios';
import credentials from './credentials';

const baseAPI = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
const signupPath = 'signupNewUser';
const loginPath = 'verifyPassword';

const makePath = path => (baseAPI + path);

export const signUp = axios.create({
    baseURL: makePath(signupPath),
    params: {
        key: credentials.google.apiKey
    }
});

export const login = axios.create({
    baseURL: makePath(loginPath),
    params: {
        key: credentials.google.apiKey
    }
});
