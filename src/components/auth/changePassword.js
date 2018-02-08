import React, { Component } from 'react';

class ChangePassword extends Component {
  render() {
    return (
      <div className="background">
        <div id="changepassword">
          <div className="form-group">
            <h1> You Wanna change your password, Go ahead!</h1>
            <form onSubmit={this.handleLogin} >
                  <div className="input-group">
          <span className="input-group-addon" id="email"><i className="fa fa-envelope" /></span>
          <input
                  type="email"
                  id="emailsignup"
                  name="email_field"
                  aria-describedby="email"
                  className="form-control"
                  placeholder="example@gmail.com"
                />
        </div>
                  <br />
                  <div className="input-group">
          <span className="input-group-addon" ><i className="fa fa-lock" /></span>
          <input
                  type="password"
                  name="password_field"
                  className="form-control"
                  placeholder="Password"
                />
        </div>
                  <br />
                  <div className="input-group">
          <span className="input-group-addon" ><i className="fa fa-lock" /></span>
          <input
                  type="password"
                  name="new_password"
                  className="form-control"
                  placeholder="New Password"
                />
        </div>
                  <br />
                  <input name="signin" className="btn-nav" id="signin" value="Save" type="submit" />
                </form>
          </div>
        </div>
      </div>
    );
  }
}
export default ChangePassword;
