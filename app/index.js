import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import rxjs from 'rxjs';
import { Task } from './storages/task';
import { App } from './storages/app';

import { remote } from 'electron';
const elog = remote.getGlobal('elog');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let initialState = {
  app: {
    notification: {
      message: '',
      show: false
    }
  }
};

Task.getAll().then((tasks) => {
  let currentTask = (tasks.length > 0)  ? tasks[0]._id : null;

  initialState.tasks = {
    items: tasks,
    currentTask: currentTask
  };

}).then(() => {
  App.getSettings().then((settings) => {
    if(!settings) {
      settings = {
        values: {
          tasks: {
            showCompleted: true,
            showArchived: false
          }
        }
      };
    }
    initialState.app.settings = settings.values;

    const store = configureStore(initialState);
    const history = syncHistoryWithStore(hashHistory, store);

    render(
      <Provider store={store}>
        <MuiThemeProvider>
          <Router history={history} routes={routes} />
        </MuiThemeProvider>
      </Provider>,
      document.getElementById('root')
    );
  });

});
