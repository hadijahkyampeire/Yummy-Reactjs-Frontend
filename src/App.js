import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Notifications from 'react-notify-toast';

import Signup from './components/auth/signup';
import Login from './components/auth/login';
import Categories from './components/categories/dashboard';

import Landing from './components/auth/landing';
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
