// @flow
import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import * as appActions from '../actions/appActions';

class App extends Component {
  props: {
    children: HTMLElement
  };

  constructor(props) {
    super(props);
  }

  handleRequestClose = () => {
    this.props.dispatch(appActions.removeError());
  };

  render() {
    return (
      <div>
        {this.props.children}

        <Snackbar
          open={this.props.error.show}
          message={this.props.error.message}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.app.error,
  };
}

export default connect(mapStateToProps)(App)
