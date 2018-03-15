import React, {Component} from 'react';
import axiosInstance from '../Apicalls';
import {notify} from 'react-notify-toast'
import {Link, Redirect} from 'react-router-dom';
import {Nav} from './Landing'

class Signup extends Component {
    state = {
        password_field: '',
        email_field: '',
        username: '',
        error:null,
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleRegister = (event) => {
        const {email_field: email, password_field: password, username: username} = this.state;

        event.preventDefault();
        axiosInstance
            .post('auth/register', {username, email, password})
            .then(response => {
                notify.show(response.data.message, 'success', 4000);
                this
                    .props
                    .history
                    .push('/login');
            })
            .catch(error => {
                if (error.response) {
                    this.setState({error: error.response.data.message})
                    // notify.show(error.response.data.message, 'error', 3000)
                } else if (error.request) {
                    notify.show("Request not made", 'error', 3000)
                }
            });
    }

    render() {
        const {username, password_field, email_field} = this.state;
        let user = this.state.username
        
        if(this.props.loggedIn){
            // if one is loggedin it should not show signup anymore
            return(<Redirect to='/dashboard'/>)
        }

        return (
            
            <div className="background">
                <div id="signbar">
                        <div >
                    <i className="fa fa-user-circle fa-5x" style={{color:"#26A69A"}}></i>
                    <div> REGISTER </div>
                </div>
                    <form onSubmit={this.handleRegister}>
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
                        <div className="input-group">
                            <span className="input-group-addon pr-4" id="username"><i className='fa fa-user'/></span>
                            <input
                                id="username"
                                name="username"
                                aria-describedby="username"
                                className="form-control"
                                placeholder="example"
                                onChange={this.handleInputChange}
                                value={username}/>
                        </div>
                        <br/>
                        <div className="input-group">
                            <span className="input-group-addon pr-4" id="email"><i className='fa fa-envelope'/></span>
                            <input
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
                            <span className="input-group-addon pr-4" id="email"><i className='fa fa-lock'/></span>
                            <input
                                type="password"
                                name="password_field"
                                className="form-control"
                                onChange={this.handleInputChange}
                                value={password_field}
                                placeholder="Password"/>
                        </div>
                        <br/>
                            <div className="text-center">
                                <input name="signup" id="signup" value="Signup" className="btn btn-default btn-lg" type="submit"/>
                            
                        </div>

                        <div className="change_link">
                            Already a member ?
                            <Link to="/login"><h4 className="toregister">Login here</h4>
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}
export default Signup;
