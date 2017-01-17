import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {List, ListItem, makeSelectable} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Toggle from 'material-ui/Toggle'
import Drawer from 'material-ui/Drawer'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import * as taskActions from '../actions/taskActions'
import * as appActions from '../actions/appActions'

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

  handleSwitch = (event, value) => {
    const target = event.target.value;
    if(target == 'completed') {
      this.props.updateSetting({'showCompleted': value}, 'tasks');
    }
    else if(target == 'archived') {
      this.props.updateSetting({'showArchived': value}, 'tasks');
    }
  }

  taskListRender() {
    // filter by settings
    const taskList = this.props.tasks.filter((task) => {
      if(!this.props.settings.showCompleted && task.completed) {
        return false;
      }
      if(!this.props.settings.showArchived && task.archived) {
        return false;
      }
      else return true;
    })
    // sort by group
    .sort((a, b) => {
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
      <div>
        <div style={{backgroundColor: '#eee', padding: '10px 20px'}}>
          <Toggle
            label="Completed"
            labelPosition="right"
            defaultToggled={this.props.settings.showCompleted}
            onToggle={this.handleSwitch}
            value='completed'
          />
          <Toggle
            label="Archived"
            labelPosition="right"
            defaultToggled={this.props.settings.showArchived}
            onToggle={this.handleSwitch}
            value='archived'
          />
        </div>
        <SelectableList>
          { this.taskListRender() }
        </SelectableList>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    tasks: state.tasks.items,
    settings: state.app.settings.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...taskActions, ...appActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
