// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import Sidebar from './Sidebar';
import TaskDetails from './TaskDetails';
import { taskDBPath } from '../storage'

export default class Home extends Component {

  render() {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--4-col">
          <Sidebar />
        </div>
        <div className="mdl-cell mdl-cell--8-col">
          <TaskDetails />
        </div>
      </div>
    );
  }
}
