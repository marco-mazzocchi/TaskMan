import { remote } from 'electron';
import nedb from 'nedb';
import path from 'path';
import { Storage, db } from './index';

export const taskDBPath = path.join(remote.app.getPath('userData'), 'storage/tasks.db');
db.tasks = new nedb(taskDBPath);
db.tasks.loadDatabase();

export class Task extends Storage {

  static collection = db.tasks;

  static complete(taskId) {
    const _this = this;
    return new Promise (
      (resolve, reject) => {
        _this.collection.findOne({ _id: taskId }, function (err, task) {
          if(err) {
            reject(err);
          }
          task.completed = !task.completed;
          _this.collection.update({ _id: taskId }, task, {}, function (err, numReplaced) {
            if(err) {
              reject(err);
            }
            else resolve(task);
          });
        });
    });
  }

  static archive(taskId) {
    const _this = this;
    return new Promise (
      (resolve, reject) => {
        _this.collection.findOne({ _id: taskId }, function (err, task) {
          if(err) {
            reject(err);
          }
          task.archived = !task.archived;
          _this.collection.update({ _id: taskId }, task, {}, function (err, numReplaced) {
            if(err) {
              reject(err);
            }
            else resolve(task);
          });
        });
    });
  }

}
