import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/updateObject';

const initialState = {
    authenticated: false,
    authenticating: false,
    token: null,
    userId: null,
    error: null,
    redirectPath: '/'
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, {
                authenticated: false,
                authenticating: true,
                error: null
            });
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {
                authenticating: false,
                authenticated: false,
                error: action.error
            });
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                authenticated: true,
                authenticating: false,
                error: null,
                token: action.token,
                userId: action.userId
            });
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                authenticated: false,
                token: null,
                userId: null
            });
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return updateObject(state, { redirectPath: action.path });
        default:
            return state
    }
};

export default authReducer;