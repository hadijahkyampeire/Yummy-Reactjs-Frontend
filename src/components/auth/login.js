
import React, { Component } from 'react';
import axiosInstance from '../Apicalls';
import {notify} from 'react-notify-toast';
import { Link,Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

class Login extends Component {

    static propTypes = {
        login: PropTypes.func.isRequired,

    }

  state = {
    password_field: '',
    email_field: '',
}

handleInputChange = (event)=>{
    const { name, value} = event.target;
    this.setState({
        [name]:value,
    });
}

handleLogin = (event)=>{
    const {email_field:email, password_field:password} = this.state;

    event.preventDefault();
    axiosInstance.post('auth/login',{email,password})
    .then(response=>{
        localStorage.setItem('accessToken', response.data.access_token);
        this.props.login();
        notify.show(response.data.message, 'success', 4000);
    }).catch(error=>{
        if(error.response){
            alert(error.response.data.message)
        }else if (error.request){
            alert("Request not made")
        }
    });
}
  render() {
    const {password_field, email_field} = this.state;

    if(this.props.loggedIn){
        return (<Redirect to={ {pathname:'/dashboard'}}/>)
    }
    return (
      <div className="background">
        <div id="logbar">
        <div className="form-group">
          <h1> LOGIN </h1>
          <form onSubmit={this.handleLogin} >
          <div className="input-group">
          <span className="input-group-addon" id="email"><i className='fa fa-envelope'/></span>
          <input
              type="email"
              id="emailsignup"
              name="email_field"
              aria-describedby="email"
              className="form-control"
              placeholder="example@gmail.com"
              onChange={this.handleInputChange}
              value={email_field}/>
      </div>
      <br/>
      <div className="input-group">
          <span className="input-group-addon" id="email"><i className='fa fa-lock'/></span>
          <input
              type="password"
              name="password_field"
              className="form-control"
              onChange={this.handleInputChange}
              value={password_field}
              placeholder="Password"/>
      </div>
            <br/>
            
            <button name="signin" className="btn btn-default" id="signin" type="submit">
            <i className="glyphicon glyphicon-log-in"> LOGIN</i></button>
          </form>
          <div className="change_link">
				Not a member yet ?
				<Link to="/register">< h4 className="toregister" >Register Here</h4></Link>
								</div>
        </div>
        <a href="#" data-toggle="modal" data-target="#forgot_password">ForgotPassword?</a>
        <div className="modal fade" id="forgot_password" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Reset password</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <input
                    type="email"
                    id="email"
                    name="email_field"
                    aria-describedby="email"
                    className="form-control"
                    placeholder="example@gmail.com"/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary">Send Email</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>
        </div>
        <footer className="footer">
          <p>&copy; Hadijah 2018</p>
        </footer>
      </div>
    );
  }
}

export default Login;
