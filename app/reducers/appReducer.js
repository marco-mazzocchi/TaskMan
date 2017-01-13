import * as taskActions from '../actions/taskActions';
import * as appActions from '../actions/appActions';

const actions = {...taskActions, ...appActions};

const defaultState = {
  error: {
    message: '',
    show: false
  }
};

const appReducer = (state = defaultState, action) => {

  switch(action.type) {
      case actions.ADD_TASK_ERROR:
        const error = action.payload;
        return Object.assign({}, state, {error: { message: error, show: true}});
      case actions.REMOVE_ERROR:
        return Object.assign({}, state, {error: defaultState.error});
      default:
        return state;
  }
};

export default appReducer;
