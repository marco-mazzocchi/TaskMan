import {
  ADD_TASK, DELETE_TASK, COMPLETE_TASK, UPDATE_TASK,
  taskAdded, taskDeleted, taskUpdated, addTaskError
} from '../actions/taskActions';
import { Observable } from 'rxjs';
import { Task } from '../storage';
import { remote } from 'electron';
const elog = remote.getGlobal('elog');

export const addTaskEpic = action$ =>
  action$
    .ofType(ADD_TASK)
    .mergeMap((action) => {
      return Observable
        .fromPromise(Task.insert(action.payload))
        .map(task => taskAdded(task))
        .catch(error => addTaskError(error))
    })

export const deleteTaskEpic = action$ =>
  action$
    .ofType(DELETE_TASK)
    .mergeMap((action) => {
      return Observable.fromPromise(Task.remove(action.payload)).map(taskId => taskDeleted(taskId))
    })
    .catch(error => addTaskError(error))

export const completeTaskEpic = action$ =>
  action$
    .ofType(COMPLETE_TASK)
    .mergeMap((action) => {
      elog.info('merge map in epic');
      return Observable.fromPromise(Task.complete(action.payload)).map(task => taskUpdated(task))
    })
    .catch(error => addTaskError(error))

export const updateTaskEpic = action$ =>
  action$
    .ofType(UPDATE_TASK)
    .mergeMap((action) => {
      return Observable
              .fromPromise(Task.update(action.payload.taskId, action.payload.updatedProperty))
              .map(task => taskUpdated(task))
    })
    .catch(error => addTaskError(error))
