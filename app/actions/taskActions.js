import { createAction } from 'redux-actions';
import db from '../storage';

export const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
export const ADD_TASK = 'ADD_TASK';
export const TASK_ADDED = 'TASK_ADDED';
export const DELETE_TASK = 'DELETE_TASK';
export const TASK_DELETED = 'TASK_DELETED';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const TASK_UPDATED = 'TASK_UPDATED';
export const UPDATE_TASK = 'UPDATE_TASK';
export const ADD_TASK_ERROR = 'ADD_TASK_ERROR';

export const setCurrentTask = createAction(SET_CURRENT_TASK, (taskId) => taskId);
export const addTask = createAction(ADD_TASK, (task) => task);
export const taskAdded = createAction(TASK_ADDED, (task) => task);
export const deleteTask = createAction(DELETE_TASK, (taskId) => taskId);
export const taskDeleted = createAction(TASK_DELETED, (taskId) => taskId);
export const completeTask = createAction(COMPLETE_TASK, (taskId) => taskId);
export const taskUpdated = createAction(TASK_UPDATED, (task) => task);
export const updateTask = createAction(UPDATE_TASK, (taskId, updatedProperty) => {
  return {taskId, updatedProperty};
});
export const addTaskError = createAction(ADD_TASK_ERROR, (error) => error);
