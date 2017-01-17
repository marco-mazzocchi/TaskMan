import * as taskActions from '../actions/taskActions'
import * as appActions from '../actions/appActions'
import { dottedKeyToObject } from '../utils/object'

const actions = {...taskActions, ...appActions};

const defaultState = {
  notification: {
    message: '',
    show: false
  },
  settings: {
    tasks:
      {
        showCompleted: true,
        showArchived: false
      }
  }
};

const appReducer = (state = defaultState, action) => {

  switch(action.type) {
      case actions.SHOW_NOTIFICATION:
        const message = action.payload;
        return Object.assign({}, state, {notification: { message: message, show: true}});
        break;
      case actions.REMOVE_NOTIFICATION:
        return Object.assign({}, state, {notification: defaultState.notification});
        break;
      case actions.SETTING_UPDATED:
         const { value, section } = action.payload;
         let clonedState = Object.assign({}, state);
         clonedState.settings[section] = {...clonedState.settings[section], ...value};
        return clonedState;
      return state;
        break;
      default:
        return state;
  }
};

export default appReducer;
