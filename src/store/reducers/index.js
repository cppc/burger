import {combineReducers} from 'redux';
import burger from './burgerReducer';
import checkout from './checkoutReducer';
import order from './orderReducer';

const rootReducer = combineReducers({
    burger,
    checkout,
    order
});

export default rootReducer;