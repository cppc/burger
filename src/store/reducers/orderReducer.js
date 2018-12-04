import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../utility/updateObject";

const initialState = {
    orders: [],
    order: {},
    loading: false,
    saving: false
};

const orderReducer = (state = initialState, action) => {
    const newValues = {};

    switch (action.type) {
        case actionTypes.RECEIVE_ORDERS:
            return updateObject(state, {
                orders: [...action.payload],
                loading: false
            });
        case actionTypes.LOAD_ORDERS:
            return updateObject(state, { loading: true });
        case actionTypes.SAVE_ORDER:
            return updateObject(state, { saving: true });
         case actionTypes.RECEIVE_ORDER:
            return updateObject(state, {
                order: action.payload,
                saving: false
            });
        default:
            return state;
    }
};

export default orderReducer;