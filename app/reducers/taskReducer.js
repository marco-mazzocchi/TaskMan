import * as actions from '../actions/taskActions';

const defaultState = {
  currentTask: null,
  items: [],
  errors: []
};

const taskReducer = (state = defaultState, action) => {

  let tasksList = Object.assign([], state.items);
  let errorList = Object.assign([], state.errors);

  switch(action.type) {
      case actions.SET_CURRENT_TASK:
          return Object.assign({}, state, {currentTask: action.payload});
        break;
      case actions.TASK_ADDED:
        const newTask = action.payload;
        tasksList.push(newTask);
        return Object.assign({}, state, {items: tasksList, currentTask: newTask._id});
        break;
      case actions.TASK_DELETED:
        tasksList = tasksList.filter((task) => task._id != action.payload);
        return Object.assign({}, state, {items: tasksList});
        break;
      case actions.TASK_UPDATED:
        const updatedTask = action.payload;
        tasksList = tasksList.map((task) => {
            if(task._id == updatedTask._id)
              task = updatedTask;
            return task;
        });
        return Object.assign({}, state, {items: tasksList});
        break;
      default:
        return state;
  }
};

export default taskReducer;
