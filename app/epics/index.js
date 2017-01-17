import { combineEpics } from 'redux-observable';
import * as taskEpics from './taskEpics';
import * as appEpics from './appEpics';

// get object values into array and the spread in function parameters (...)
const rootEpic = combineEpics(
  ...Object.values(taskEpics),
  ...Object.values(appEpics)
);

export default rootEpic;
