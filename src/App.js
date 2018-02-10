import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Notifications from 'react-notify-toast';

import Signup from './components/auth/signup';
import Login from './components/auth/login';
import About from './components/auth/About';
import ChangePassword from './components/auth/changePassword';
import Categories from './components/categories/dashboard';
import { Nav } from './components/auth/landing';
// import { Footer } from './components/auth/login';
import ViewRecipes from './components/recipes/ViewRecipes';

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
          <Nav />
          <Notifications />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/changepassword" component={ChangePassword} />
            <Route exact path="/dashboard" component={Categories} />
            <Route exact path="/category/:id/recipes" component={ViewRecipes} />
            <Route component={NotFound} />
          </Switch>
          {/* <Footer/> */}
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
