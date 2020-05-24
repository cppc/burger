import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { watchAuth } from './sagas';

import rootReducer from './reducers'

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
    const result = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(ReduxThunk, sagaMiddleware))
    );
    sagaMiddleware.run(watchAuth);
    return result;
}