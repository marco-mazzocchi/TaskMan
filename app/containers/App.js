// @flow
import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import * as appActions from '../actions/appActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue800, blue700, deepOrange500, deepOrange400 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';

class App extends Component {
  props: {
    children: HTMLElement
  };

  constructor(props) {
    super(props);
  }

  handleRequestClose = () => {
    this.props.dispatch(appActions.removeNotification());
  };

  render() {

    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: blue800,
        primary2Color: blue700,
        accent1Color: deepOrange500,
        accent2Color: deepOrange400,
      },
      appBar: {
        height: 50,
      },
    });

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <div>
        <AppBar
          title="TaskMan"
          showMenuIconButton={true}
        />

        {this.props.children}

        <Snackbar
          open={this.props.notification.show}
          message={this.props.notification.message}
          autoHideDuration={3000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    notification: state.app.notification,
  };
}

export default connect(mapStateToProps)(App)
