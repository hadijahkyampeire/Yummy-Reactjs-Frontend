
import React, { Component } from 'react';
import axios from 'axios';
import {notify} from 'react-notify-toast'
import { Link } from 'react-router-dom';

class Login extends Component {
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
    axios.post('http://127.0.0.1:5000/api/v1/auth/login',{email,password})
    .then(response=>{
        notify.show(response.data.message, 'success', 4000);
        this.props.history.push('/dashboard');
        localStorage.setItem('accessToken', response.data.access_token);
        console.log(response);
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
        <div class="modal fade" id="forgot_password" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Reset password</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <input
                    type="email"
                    id="emailsignup"
                    name="email_field"
                    aria-describedby="email"
                    className="form-control"
                    placeholder="example@gmail.com"/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Send Email</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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
