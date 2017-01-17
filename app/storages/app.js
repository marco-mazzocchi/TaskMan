import { remote } from 'electron';
import nedb from 'nedb';
import path from 'path';
import { Storage, db } from './index';
const elog = remote.getGlobal('elog');

export const appDBPath = path.join(remote.app.getPath('userData'), 'storage/app.db');
db.app = new nedb(appDBPath);
db.app.loadDatabase();

export class App extends Storage {

  static collection = db.app;

  static updateSetting(value, section) {
    const _this = this;
    const settingKey = 'values.' + section + '.' + Object.keys(value)[0];
    let setting = {};
    setting[settingKey] = Object.values(value)[0];

    return new Promise (
      (resolve, reject) => {
        _this.collection.update({'name': 'settings'}, {$set: setting}, {'upsert': true}, function (err, numAffected, affectedDocuments, upsert) {
          if(err) reject(err);
          else resolve({value, section});
        });
      }
    );
  }

  static getSettings() {
    const _this = this;
    return new Promise (
      (resolve, reject) => {
        _this.collection.findOne({'name': 'settings'}, function (err, settings) {
          if(err) reject(err);
          resolve(settings);
        });
    });
  }

}
