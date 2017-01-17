import * as actions from '../actions/appActions';
import { Observable } from 'rxjs';
import { ErrorObservable } from '../storages';
import { App } from '../storages/app';

export const updateSettingEpic = action$ =>
  action$
    .ofType(actions.UPDATE_SETTING)
    .mergeMap((action) => {
      return Observable
              .fromPromise(App.updateSetting(action.payload.value, action.payload.section))
              .map((response) => actions.settingUpdated(response.value, response.section))
              .catch(error => {
                  return ErrorObservable(error)
              })
    })
