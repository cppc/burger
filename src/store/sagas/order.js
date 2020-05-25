import { put } from 'redux-saga';

import axios from "../../axios-orders";

import { loadOrders, receiveOrders, saveOrder, receiveOrder } from '../actions';

export function* fetchOrdersSaga(action) {
    yield put(loadOrders());
    const { token, userId } = action;
    const query = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    try {
        const res = yield axios.get('/orders.json' + query);
        const fetchedOrders = yield Object.keys(res.data).map(key => ({
            ...res.data[key],
            id: key
        }));
        yield put(receiveOrders(fetchedOrders))
    } catch(error) {
        yield put(receiveOrders([]))
    }
}

export function* postOrderSaga(action) {
    yield put(saveOrder());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.order);
        yield put(receiveOrder(response.data));
    } catch (error) {
        yield put(receiveOrder({}))
    }
}