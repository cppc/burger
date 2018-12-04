import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const receiveOrders = (orders) => ({type: actionTypes.RECEIVE_ORDERS, payload: orders});
export const receiveOrder = (order) => ({type: actionTypes.RECEIVE_ORDER, payload: order});
export const loadOrders = () => ({type: actionTypes.LOAD_ORDERS});
export const saveOrder = () => ({type: actionTypes.SAVE_ORDER});

export const fetchOrders = () => (dispatch) => {
    console.log("Fetch", dispatch);
    dispatch(loadOrders());
    axios.get('/orders.json')
        .then( res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(receiveOrders(fetchedOrders))
        })
        .catch(error => {
            dispatch(receiveOrders([]))
        })
};

export const postOrder = order => dispatch => {
    dispatch(saveOrder());
    axios.post('/orders.json', order)
        .then(response => {
            console.log(response);
            dispatch(receiveOrder(response.data));
//            this.props.history.push('/');
        })
        .catch(error => {
            console.log(error);
            dispatch(receiveOrder({}));
        })
};