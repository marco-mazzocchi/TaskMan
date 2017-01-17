import { remote } from 'electron';
import nedb from 'nedb';
import path from 'path';
import * as actions from '../actions/appActions';

const elog = remote.getGlobal('elog');

export let db = {};

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

export const ErrorObservable = (error) => {
  return Observable.of(
    {
      type: actions.SHOW_NOTIFICATION,
      payload: error.message,
      error: true
    }
  );
};
