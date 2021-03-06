import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import * as taskActions from '../actions/taskActions'
import InlineEdit from 'react-edit-inline'
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import {Scrollbars} from 'react-custom-scrollbars'

class TaskDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "addTaskModalVisible": false,
      "newTitle": '',
      'newDescription': '',
      'newGroup': 'other',
    };
  }

  handleAddTask() {
    this.setState({
      "addTaskModalVisible": true
    });
  }

  handleCloseAddModal() {
    this.setState({
      "addTaskModalVisible": false
    });
  }

  handleSubmitAddModal() {
    const task = {
      title: this.state.newTitle,
      description: this.state.newDescription,
      group: this.state.newGroup,
      completed: false,
      archived: false
    };

    const newTask = this.props.addTask(task);

    this.handleCloseAddModal();

    // empty form fields
    this.setState({
      "newTitle": '',
      "newDescription": '',
      "newGroup": 'other',
    });
  }

  handleNewTitleChange = (event) => {
    this.setState({
      "newTitle": event.target.value
    });
  }

  handleNewDescriptionChange = (event) => {
    this.setState({
      "newDescription": event.target.value
    });
  }

  handleNewGroupChange = (event) => {
    this.setState({
      "newGroup": event.target.value.trim()
    });
  }

  handleDeleteTask = () => {
    this.props.deleteTask(this.props.currentTask);
  }

  handleCompleteTask = () => {
    this.props.completeTask(this.props.currentTask);
  }

  handleArchiveTask = () => {
    this.props.archiveTask(this.props.currentTask);
  }

  handleInlineChange = (update) => {
    this.props.updateTask(this.props.currentTask, update);
  }

  renderAddButton() {

    const style = {
      position: 'fixed',
      bottom: '20px',
      right: '20px'
    }

    const dialogActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseAddModal.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmitAddModal.bind(this)}
      />,
    ];

    return (
      <div>
        <FloatingActionButton style={style} onClick={this.handleAddTask.bind(this)}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
            title="Add task"
            actions={dialogActions}
            modal={false}
            open={this.state.addTaskModalVisible}
            onRequestClose={this.handleCloseAddModal.bind(this)}
          >
            <TextField
              floatingLabelText="Title"
              fullWidth={true}
              value={this.state.newTitle}
              onChange={this.handleNewTitleChange}
            />
            <br />
            <TextField
              floatingLabelText="Group"
              fullWidth={true}
              value={this.state.newGroup}
              onChange={this.handleNewGroupChange}
            />
            <br />
            <TextField
              floatingLabelText="Description"
              multiLine={true}
              rows={4}
              rowsMax={6}
              value={this.state.newDescription}
              onChange={this.handleNewDescriptionChange}
              fullWidth={true}
            />
        </Dialog>
      </div>
    );
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

  render() {

    let styles = {

    };
    let noTaskStyles = {
      'textAlign': 'center'
    };

    let { tasks, currentTask } = this.props;
    let currentTaskData = null;
    if(currentTask) {
      currentTaskData = tasks.filter((task) => {
        return task._id == currentTask
      });
      currentTaskData = (currentTaskData.length) ? currentTaskData[0] : null;
    }

    if(currentTaskData) {

      let completeButton;
      if(currentTaskData.completed) {
        completeButton = <FlatButton
          onClick={ this.handleCompleteTask }
          label="Uncomplete"
          primary={true}
          icon={ <FontIcon className="material-icons">undo</FontIcon> }
        />;
      }
      else {
        completeButton = <FlatButton
          onClick={ this.handleCompleteTask }
          label="Complete"
          primary={true}
          icon={ <FontIcon className="material-icons">check</FontIcon> }
        />;
      }

      let archiveButton;
      let taskArchived = '';
      if(currentTaskData.archived) {
        taskArchived = <small>[archived]</small>;
        archiveButton = <FlatButton
          onClick={ this.handleArchiveTask }
          label="Unarchive"
          primary={true}
          icon={ <FontIcon className="material-icons">archive</FontIcon> }
        />;
      }
      else {
        archiveButton = <FlatButton
          onClick={ this.handleArchiveTask }
          label="Archive"
          primary={true}
          icon={ <FontIcon className="material-icons">unarchive</FontIcon> }
        />;
      }

      const inlineElementStyle = {
        borderBottom: 'dashed 1px #ddd',
        outline: 'none'
      };

      const inlineTextareStyle = {
        borderBottom: 'dashed 1px #ddd',
        outline: 'none',
        'min-height': '300px'
      };

      return (
           <div style={styles}>

             <Card>
               <CardHeader
                 title={<span><InlineEdit
                   activeClassName='mdl-textfield__input'
                   text={currentTaskData.title}
                   paramName="title"
                   change={this.handleInlineChange}
                   style={inlineElementStyle}
                 /> {taskArchived}</span>}
                 subtitle={<InlineEdit
                   activeClassName='mdl-textfield__input'
                   text={currentTaskData.group || this.state.newGroup}
                   paramName="group"
                   change={this.handleInlineChange}
                   style={inlineElementStyle}
                 />}
                 avatar={<Avatar icon={this.getStatusIcon(currentTaskData.completed)} backgroundColor='#42A5F5' />}
               />
               <CardText>
                 <Scrollbars autoHeight={true} autoHeightMin={350} autoHeightMax={350}>
                   <InlineEdit
                   activeClassName="mdl-textfield__input"
                   text={currentTaskData.description}
                   paramName="description"
                   change={this.handleInlineChange}
                   style={inlineTextareStyle}
                   editingElement='textarea'
                   maxLength={100000000000}
                   />

                   {/*
                     <TextField
                    multiLine={true}
                    rows={4}
                    rowsMax={10}
                    value={currentTaskData.description}
                    fullWidth={true}
                    name={description}
                    onChange={this.handleInlineChange}
                  />
                   */}
                 </Scrollbars>
               </CardText>
               <CardActions>
                 { completeButton }

                 { archiveButton }

                 <FlatButton
                   onClick={ this.handleDeleteTask }
                   label="Delete"
                   secondary={true}
                   icon={ <FontIcon className="material-icons">delete</FontIcon>}
                 />
               </CardActions>
             </Card>

               { this.renderAddButton() }
           </div>
      );
    }
    else {
      return (
        <div style={noTaskStyles}>
            <h4>Select or add a task</h4>
            { this.renderAddButton() }
        </div>
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    tasks: state.tasks.items,
    currentTask: state.tasks.currentTask
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(taskActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)
