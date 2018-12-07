import * as actionTypes from '../actions/actionTypes';

const initialState = {
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1.1,
    meat: 1.3,
    bacon: 0.7
};

const updateIngredient = (state, type, adjustment) => {
    const oldPrice = state.totalPrice;
    const updatedPrice = oldPrice + adjustment * INGREDIENT_PRICES[type];
    return { totalPrice: updatedPrice };
};

const checkoutReducer = (state = initialState, action) => {

    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):
            return updateIngredient(state, action.ingredient, 1);
        case(actionTypes.REMOVE_INGREDIENT):
            return updateIngredient(state, action.ingredient, -1);
        default:
            return state;
    }
};

export default checkoutReducer;