import {
  ADD_TASK, DELETE_TASK, COMPLETE_TASK, UPDATE_TASK, ARCHIVE_TASK,
  taskAdded, taskDeleted, taskUpdated
} from '../actions/taskActions';
import {
  showNotification
} from '../actions/appActions';
import { Observable } from 'rxjs';
import { ErrorObservable } from '../storages';
import { Task } from '../storages/task';

export const addTaskEpic = action$ =>
  action$
    .ofType(ADD_TASK)
    .mergeMap((action) => {
      return Observable
        .fromPromise(Task.insert(action.payload))
        .map(task => taskAdded(task))
        .catch(error => {
            return ErrorObservable(error)
        })
    })

export const deleteTaskEpic = action$ =>
  action$
    .ofType(DELETE_TASK)
    .mergeMap((action) => {
      return Observable
        .fromPromise(Task.remove(action.payload))
        .map(taskId => taskDeleted(taskId))
        .catch(error => {
            return ErrorObservable(error)
        })
    })

export const completeTaskEpic = action$ =>
  action$
    .ofType(COMPLETE_TASK)
    .mergeMap((action) => {
      return Observable
        .fromPromise(Task.complete(action.payload))
        .map(task => taskUpdated(task))
        .catch(error => {
            return ErrorObservable(error)
        })
    })

export const updateTaskEpic = action$ =>
  action$
    .ofType(UPDATE_TASK)
    .mergeMap((action) => {
      return Observable
              .fromPromise(Task.update(action.payload.taskId, action.payload.updatedProperty))
              .map(task => taskUpdated(task))
              .catch(error => {
                  return ErrorObservable(error)
              })
    })

export const archiveTaskEpic = action$ =>
  action$
    .ofType(ARCHIVE_TASK)
    .mergeMap((action) => {
      return Observable
        .fromPromise(Task.archive(action.payload))
        .map(task => taskUpdated(task))
        .catch(error => {
            return ErrorObservable(error)
        })
    })
