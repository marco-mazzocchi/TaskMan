import { remote } from 'electron';
import nedb from 'nedb';
import path from 'path';
const elog = remote.getGlobal('elog');

let db = {};
export const taskDBPath = path.join(remote.app.getPath('userData'), 'storage/tasks.db');
db.tasks = new nedb(taskDBPath);
db.tasks.loadDatabase();

export class Storage {

  static collection = null;

  static getAll() {
    const _this = this;
    return new Promise (
      (resolve, reject) => {
        _this.collection.find({}, function (err, elements) {
          if(err) reject(err);
          else resolve(elements);
        });
    });
  }

  static insert(newElement) {
    const _this = this;
    return new Promise (
      (resolve, reject) => {
        _this.collection.insert(newElement, function (err, newDoc) {
          if(err) reject(err);
          else resolve(newDoc);
        });
    });
  }

  static remove(id) {
    const _this = this;
    return new Promise (
    (resolve, reject) => {
      _this.collection.remove({ _id: id }, {}, function (err, numRemoved) {
        if(err) reject(err);
        else resolve(id);
      });
    });
  }

  static update(id, updatedProperty) {
    const _this = this;
    return new Promise (
      (resolve, reject) => {
        _this.collection.findOne({ _id: id }, function (err, element) {
          if(err) reject(err);
          const updatedElement = {...element, ...updatedProperty};
          _this.collection.update({ _id: id }, updatedElement, {}, function (err, numReplaced) {
            if(err) { reject(err); }
            else resolve(updatedElement);
          });
        });
      });
  }

}

export class Task extends Storage {

  static collection = db.tasks;

  static complete(taskId) {
    elog.info("complete called");
    const _this = this;
    return new Promise (
      (resolve, reject) => {
        elog.info("complete promise executed");
        _this.collection.findOne({ _id: taskId }, function (err, task) {
          elog.info("findOne called");
          if(err) {
            elog.error(err);
            reject(err);
          }
          task.completed = !task.completed;
          _this.collection.update({ _id: taskId }, task, {}, function (err, numReplaced) {
            if(err) {
              elog.error(err);
              reject(err);
            }
            else resolve(task);
          });
        });
    });
  }

}

export default db;
