import { Store, applyMiddleware, compose, createStore } from 'redux';
import { ReduxStore } from './';
import createSagaMiddleware from 'redux-saga';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import reducers from './index';

const persistConfig = {
  key: 'veezoo-assignment-bruno-lucena',
  storage,
};

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedCombinedReducers = persistCombineReducers(persistConfig, reducers);

export const sagaMiddleware = createSagaMiddleware();

const store: Store<ReduxStore> = createStore(persistedCombinedReducers, composeEnhancers(applyMiddleware(sagaMiddleware)));

export default store;
