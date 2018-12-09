import {combineReducers} from 'redux';
import burger from './burgerReducer';
import checkout from './checkoutReducer';
import order from './orderReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
    burger,
    checkout,
    order,
    auth
});

export default rootReducer;