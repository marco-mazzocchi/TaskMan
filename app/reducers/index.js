// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import taskReducer from './taskReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({
  routing,
  tasks: taskReducer,
  app: appReducer,
});

export default rootReducer;
