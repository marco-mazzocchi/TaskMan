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
import db from './storage';
import rxjs from 'rxjs';
import { Task } from './storage';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


Task.getAll().then((tasks) => {

  let currentTask = (tasks.length > 0)  ? tasks[0]._id : null;

  const initialState = {
    tasks: {
      items: tasks,
      currentTask: currentTask
    }
  };

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
