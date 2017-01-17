import { createAction } from 'redux-actions';

export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const UPDATE_SETTING = 'UPDATE_SETTING';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const SETTING_UPDATED = 'SETTING_UPDATED';

export const removeNotification = createAction(REMOVE_NOTIFICATION);
export const showNotification = createAction(SHOW_NOTIFICATION, (error) => error);
export const updateSetting = createAction(UPDATE_SETTING, (value, section) => { return {value, section} });
export const settingUpdated = createAction(SETTING_UPDATED, (value, section) => { return {value, section} });
