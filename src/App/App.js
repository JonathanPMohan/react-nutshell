import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';

import connection from '../components/helpers/data/connection';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Friends from '../components/pages/Friends/Friends';
import Articles from '../components/pages/Articles/Articles';
import Events from '../components/pages/Events/Events';
import Weather from '../components/pages/Weather/Weather';
import Messages from '../components/pages/Messages/Messages';
import MyNavBar from '../components/MyNavBar/MyNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import authRequests from '../components/helpers/data/authRequests';

// Public Route //

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

// Private Route //

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

// App Begins //

class App extends React.Component {
  state = {
    authed: false,
    currentUid: '',
    pendingUser: true,
  }

  // Auth Checker //

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const currentUid = authRequests.getCurrentUid();
        this.setState({ authed: true, currentUid, pendingUser: false });
      } else {
        this.setState({ authed: false, currentUid: '', pendingUser: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  // Logout User Click Event //

  logoutClickEvent = () => {
    authRequests.logoutUser();
    this.setState({ authed: false, currentUid: '' });
  }

  render() {
    const {
      authed,
      pendingUser,
    } = this.state;
    if (pendingUser) {
      return null;
    }

    // Routing //

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavBar isAuthed={authed} logoutClickEvent={this.logoutClickEvent} />
            <div className='container'>
              <div className='row'>
                <Switch>
                  <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                  <PrivateRoute path='/home' component={Home} authed={this.state.authed} />
                  <PrivateRoute path='/friends' component={Friends} authed={this.state.authed} />
                  <PrivateRoute path='/articles' component={Articles} authed={this.state.authed} />
                  <PrivateRoute path='/weather' component={Weather} authed={this.state.authed} />
                  <PrivateRoute path='/events' component={Events} authed={this.state.authed} />
                  <PrivateRoute path='/messages' component={Messages} authed={this.state.authed} />
                  <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
