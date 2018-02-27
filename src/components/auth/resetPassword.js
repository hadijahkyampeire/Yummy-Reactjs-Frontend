import React, { Component } from 'react';
import {notify} from 'react-notify-toast';
import  axiosInstance from "../Apicalls";

class ResetPassword extends Component {
    state = {
        email:'',
        password:'',
        retyped_password:'',
        token: null,

    }

    componentDidMount = () => {
        const search = this.props.location.search;
        const token = decodeURIComponent(search.substring(4, search.length));
        this.setState({ token })
    };

    handleInputChange =(event) =>{
        const {name, value } =event.target;
        this.setState({[name]:value});
    }
    handleResetPassword = (e)=>{
        e.preventDefault();
        const headers = {Authorization: `Bearer ${this.state.token}`}
        const {email, password, retyped_password} =this.state; 
        axiosInstance.put(`auth/reset_password`, {email, password, retyped_password},{headers})
        .then(response=>{
            notify.show(response.data.message, 'success', 4000)
            this.props.history.push('/login')
        }).catch(error=>{
            if (error.response){
                notify.show(error.response.data.message, 'error', 3000)
            }else if(error.request){
                notify.show("Request not made", 'error', 3000)
            }
        })
    }
    
  render() {
    return (
      <div className="background">
      <div id="changepassword">

      <div id="form-group">
      <h3>Password Reset</h3>
        <form onSubmit={this.handleResetPassword}>
          <div className="input-group">
            <span className="input-group-addon" id="email"><i className="fa fa-envelope" /></span>
            <input
              type="email"
              id="emailsignup"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              aria-describedby="email"
              className="form-control"
              placeholder="example@gmail.com"
            />
          </div>
          <br />
          <div className="input-group">
            <span className="input-group-addon" id="email"><i className="fa fa-lock" /></span>
            <input
              type="password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder="Password"
            />
          </div>
          <br />
          <div className="input-group">
            <span className="input-group-addon" id="email"><i className="fa fa-lock" /></span>
            <input
              type="password"
              name="retyped_password"
              className="form-control"
              value={this.state.retyped_password}
              onChange={this.handleInputChange}
              placeholder="retype_Password"
            />
          </div>
          <br />

          <button name="signin" className="btn btn-default" id="signin" type="submit">
            <i className="glyphicon glyphicon-log-in"> Save</i>
          </button>
        </form>
        </div>
        </div>
      </div>

    );
  }
}
export default ResetPassword;
