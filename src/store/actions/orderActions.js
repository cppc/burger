import * as actionTypes from './actionTypes';

export const receiveOrders = (orders) => ({type: actionTypes.RECEIVE_ORDERS, payload: orders});
export const receiveOrder = (order) => ({type: actionTypes.RECEIVE_ORDER, payload: order});
export const loadOrders = () => ({type: actionTypes.LOAD_ORDERS});
export const saveOrder = () => ({type: actionTypes.SAVE_ORDER});

export const fetchOrders = (token, userId) => ({
    type: actionTypes.FETCH_ORDERS,
    token,
    userId
});

export const postOrder = (order, token) => ({
    type: actionTypes.POST_ORDER,
    order,
    token
});