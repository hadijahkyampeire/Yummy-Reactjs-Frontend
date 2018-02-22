import React, { Component } from 'react';
import {notify} from 'react-notify-toast';
import axiosInstance from '../Apicalls';

class PasswordResetEmail extends Component {
    state = {
        email:'',
    }

    handleEmail =(event) =>{
        const {name, value} = event.target;
        this.setState({[name]:value})
    }

    handleResetEmail =(event) =>{
        const {email} =this.state;
        event.preventDefault();
        axiosInstance.post(`auth/send_email`, {email})
        .then(response =>{
            document.getElementById("close-email-modal").click()
            notify.show(response.data.message, 'success', 4000);
        }).catch(error=>{

        })

    }

  render() {
    return (
      <div className="modal fade" id="forgot_password" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reset password</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="close-email-modal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.handleResetEmail}>
            <div className="modal-body">
              <input
                type="email"
                name="email"
                onChange={this.handleEmail}
                value={this.state.email}
                aria-describedby="email"
                className="form-control"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Send Email</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>

            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default PasswordResetEmail;
