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
        <div>
          <Sidebar />
          <TaskDetails />
          <div style={{ paddingLeft: '270px', marginTop: '30px' }}>
            <small>DB location: { taskDBPath }</small>
          </div>
        </div>
    );
  }
}
