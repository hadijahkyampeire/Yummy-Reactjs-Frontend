import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Notifications from 'react-notify-toast';

import Signup from './components/signup';
import Login from './components/login';
import Categories from './components/dashboard';
import Landing from './components/landing';
import './css/style.css';

const NotFound = () => (
  <div>Page Not found</div>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Notifications />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Categories} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
