import React, { Component } from 'react';
import {notify} from 'react-notify-toast';
import axiosInstance from '../Apicalls';

/**
 * Component for handling emails when resetting password.
 * @author [Hadijah kyampeire](https://github.com/hadijahkyampeire/Yummy_Reactjs_frontend)
 */
class PasswordResetEmail extends Component {
    state = {
        email:'',
        error:null,
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
          if(error.response){
            this.setState({error: error.response.data.message})
            // notify.show(error.response.data.message, 'error', 4000)
          }else if(error.request){
            notify.show("Request not made", 'error', 3000)
          }

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
            {this.state.error ? (
                    <div className="alert alert-danger">{this.state.error}
                     <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button></div>
                  ) : (
                    ""
                  )}
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
              <button type="submit" id="sendemail" className="btn btn-primary">Send Email</button>
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
