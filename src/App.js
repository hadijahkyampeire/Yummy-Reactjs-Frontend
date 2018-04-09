import React, {Component} from 'react';
import {Switch, Route, BrowserRouter, Link} from 'react-router-dom';
import Notifications from 'react-notify-toast';
import {notify} from 'react-notify-toast';

import Signup from './components/auth/Signup';
import ResetPassword from './components/auth/ResetPassword';
import Login from './components/auth/Login';
import About from './components/auth/About';
import Categories from './components/categories/Dashboard';
import ViewRecipes from './components/recipes/ViewRecipes';
import PrivateRoute from './components/auth/PrivateRoute';
import Landing, {Nav} from './components/auth/Landing';

import axiosInstance from './components/Apicalls';

const NotFound = () => (
  <div className="container">
    <div className="row">
        <div className="col-md-12">
            <div className="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    Page Not Found, 404</h2>
                <div className="error-details">
                    Sorry, an error has occured, Requested page can not be found!
                </div>
                <div className="error-actions">
                    <Link to="/" className="btn btn-primary btn-lg" style={{backgroundColor:'#009688'}}><span className="fa fa-home"></span>
                        Take Me Home </Link>
                </div>
            </div>
        </div>
    </div>
</div>
);

class App extends Component {
  state = {
    loggedin: false
  }
  /**
   * @param {Object} event - 
   */
  logoutUser = (event) => {
    event.preventDefault();
    axiosInstance
      .post(`auth/logout`,null)
      .then(response => {
        this.setState({loggedin: false})
        localStorage.clear();
        notify.show(response.data.message, 'success', 4000);
      })
      .catch(e => {
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
            <Route exact path="/" component={props=>(<Landing {...props} loggedIn={this.state.loggedin}/>)}/>
            <Route exact path="/register" component={props=>(<Signup {...props} loggedIn={this.state.loggedin}/>)}/>
            <Route exact path="/reset" component={ResetPassword}/>
            <PrivateRoute exact path="/about" component={About} loggedIn={this.state.loggedin} />
            <Route exact path="/login" component={props => (<Login {...props} login={this.loginUser} loggedIn={this.state.loggedin} />)}/>
            <PrivateRoute exact path="/dashboard" component={Categories}  loggedIn={this.state.loggedin} />
            <PrivateRoute exact path="/category/:id/recipes" component={ViewRecipes} loggedIn={this.state.loggedin}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
