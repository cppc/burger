import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0
    },
    readyToOrder: false
};

const updateIngredient = (ingredients, type, adjustment) => {
    return {
        ...ingredients,
        [type]: ingredients[type] + adjustment
    }
};

const updateReady = (ingredients) => {
    return Object.keys(ingredients).map((key) => ingredients[key]).reduce((cnt, cur) => cnt + cur, 0) > 0;
};

const update = (state, ingredient, adjustment) => {
    const ingredients = updateIngredient(state.ingredients, ingredient, adjustment);
    const isReady = updateReady(ingredients);
    return ({
        ...state,
        ingredients: ingredients,
        readyToOrder: isReady
    });
};

const burgerReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return update(state, action.ingredient, 1);
        case actionTypes.REMOVE_INGREDIENT:
            if (state.ingredients[action.ingredient] > 0) {
                return update(state, action.ingredient, -1);
            }
            return state;
        default:
            return state;
    }
};

export default burgerReducer;