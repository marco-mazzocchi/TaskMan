import { combineEpics } from 'redux-observable';
import * as taskEpics from './taskEpics';

// get object values into array and the spread in function parameters (...)
const rootEpic = combineEpics(...Object.values(taskEpics));

export default rootEpic;
