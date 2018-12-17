import axios from 'axios';

const baseAPI = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
const signupPath = 'signupNewUser';
const loginPath = 'verifyPassword';
// const keyParam = '?key=';
// const apiKey = 'AIzaSyCL1XxXoGAyAa4HP3QSdR-lQ0eGqSPanFs';

const makePath = path => (baseAPI + path);

export const signUp = axios.create({
    baseURL: makePath(signupPath),
    params: {
        key: 'AIzaSyCL1XxXoGAyAa4HP3QSdR-lQ0eGqSPanFs'
    }
});

export const login = axios.create({
    baseURL: makePath(loginPath),
    params: {
        key: 'AIzaSyCL1XxXoGAyAa4HP3QSdR-lQ0eGqSPanFs'
    }
});
