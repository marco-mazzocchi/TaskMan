// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics';

const epicMiddleware = createEpicMiddleware(rootEpic);

const router = routerMiddleware(hashHistory);

const enhancer = applyMiddleware(thunk, router, epicMiddleware);

export default function configureStore(initialState: Object | void) {
  return createStore(rootReducer, initialState, enhancer);
}
