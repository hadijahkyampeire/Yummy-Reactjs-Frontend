import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Notifications from 'react-notify-toast';
import {notify} from 'react-notify-toast';

import Signup from './components/auth/signup';
import ResetPassword from './components/auth/resetPassword';
import Login from './components/auth/login';
import About from './components/auth/About';
import Categories from './components/categories/dashboard';
import {Nav} from './components/auth/landing';
// import { Footer } from './components/auth/login';
import ViewRecipes from './components/recipes/ViewRecipes';
import PrivateRoute from './components/auth/PrivateRoute';
import Landing from './components/auth/landing';
import './css/style.css';
import axiosInstance from './components/Apicalls';

const NotFound = () => (
  <div>Page Not found</div>
);

class App extends Component {
  state = {
    loggedin: false
  }

  logoutUser = (event) => {
    event.preventDefault();
    const headers={Authorization:`Bearer ${localStorage.getItem('accessToken')}`}
    axiosInstance
      .post(`auth/logout`,null,{headers})
      .then(response => {
        this.setState({loggedin: false})
        localStorage.clear()
        notify.show(response.data.message, 'success', 4000);
      })
      .catch(e => {
        console.log(e)
      })
  }

  loginUser = ()=>{
    this.setState({
      loggedin: true
    })
  }

  componentDidMount(){
    if(localStorage.getItem("accessToken")){
      this.loginUser();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav logout={this.logoutUser} loggedIn={this.state.loggedin}/>
          <Notifications/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/register" component={Signup}/>
            <Route exact path="/reset" component={ResetPassword}/>
            <PrivateRoute exact path="/about" component={About} loggedIn={this.state.loggedin} />
            <Route exact path="/login" component={props => (<Login {...props} login={this.loginUser} loggedIn={this.state.loggedin} />)}/>
            <PrivateRoute exact path="/dashboard" component={Categories}  loggedIn={this.state.loggedin} />
            <PrivateRoute exact path="/category/:id/recipes" component={ViewRecipes} loggedIn={this.state.loggedin}/>
            <Route component={NotFound}/>
          </Switch>
          {/* <Footer/> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
