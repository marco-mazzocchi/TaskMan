import React, { Component } from 'react'
import { Link } from 'react-router'
import {List, ListItem, makeSelectable} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Toggle from 'material-ui/Toggle'
import Drawer from 'material-ui/Drawer'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import * as taskActions from '../actions/taskActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

let SelectableList = makeSelectable(List);

class Sidebar extends Component {

  constructor() {
    super();
    this.activeTask = null;
  }

  static setCurrentTask(taskId) {
    this.props.setCurrentTask(taskId);
  }

  onTaskItemClick(taskId) {
    this.props.setCurrentTask(taskId);
  }

  getStatusIcon(completed) {
    if(completed) {
      return (
        <FontIcon className="material-icons">done</FontIcon>
      );
    }
    else {
      return (
        <FontIcon className="material-icons"></FontIcon>
      );
    }
  }

  taskListRender() {
    // sort by group
    const taskList = this.props.tasks.sort((a, b) => {
      const firstGroup = (a.group) ? a.group.toUpperCase() : '';
      const secondGroup = (b.group) ? b.group.toUpperCase() : '';
      if(firstGroup == secondGroup) {
        // sort by completed
        if(a.completed == b.completed) {
          return 0;
        }
        else if(a.completed == true) {
          return 1;
        }
        else {
          return -1;
        }
      }
      else if(firstGroup > secondGroup) {
        return 1;
      }
      else {
        return -1;
      }
    });

    let lastGroup = '';
    return taskList.map((task, key) => {

      let returnComponents = [];
      const taskGroup = (task.group) ? task.group.toUpperCase() : 'OTHER';

      if(lastGroup !== taskGroup) {
        lastGroup = taskGroup;
        returnComponents.push(<Subheader>{ lastGroup }</Subheader>);
      }

      returnComponents.push(
        <ListItem
          key={key}
          value={task._id}
          primaryText={task.title}
          leftAvatar={<Avatar icon={this.getStatusIcon(task.completed)} />}
          onClick={this.onTaskItemClick.bind(this, task._id)}
        />
      );

      return returnComponents;

    })
  }

  render() {

    return (
      <SelectableList>
        { this.taskListRender() }
      </SelectableList>
    );
  }

}

function mapStateToProps(state) {
  return {
    tasks: state.tasks.items
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(taskActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
