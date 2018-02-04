
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

handleRegister = (event)=>{
    const {email_field:email, password_field:password} = this.state;

    event.preventDefault();
    axios.post('http://127.0.0.1:5000/api/v1/auth/login',{email,password})
    .then(response=>{
        notify.show(response.data.message, 'success', 4000);
        this.props.history.push('/dashboard');
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
          <h1> LOGIN HERE</h1>
          <form method="POST" name="login">
            <label>Email</label>
            <input type="email" name="email_field" className="form-control" onChange={this.handleInputChange} value={email_field}/>
            <label>Pass word</label>
            <input type="password" name="password_field"  className="form-control" onChange={this.handleInputChange} value={password_field}/>
            <br/>
            <input name="signin" id="signin" value="LOGIN" type="Submit"/>
          </form>
          <p class="change_link">
				Not a member yet ?
				<Link to="/register">< h4 class="toregister" >Join us</h4></Link>
								</p>
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
