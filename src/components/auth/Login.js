import React, {Component} from 'react';
import axiosInstance from '../Apicalls';
import {notify} from 'react-notify-toast';
import {Link, Redirect} from 'react-router-dom';
import PasswordResetEmail from './ResetEmail';
import PropTypes from 'prop-types'

/**
 * Component for handling login.
 * @author [Hadijah kyampeire](https://github.com/hadijahkyampeire/Yummy_Reactjs_frontend)
 */
class Login extends Component {
    // initial states
    state = {
        password_field: '',
        email_field: '',
        error:null,
    }

    static propTypes = {
        login: PropTypes.func.isRequired
    }
    // handles changes and updates state
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    // function to make an API call on submit
    handleLogin = (event) => {
        const {email_field: email, password_field: password} = this.state;

        event.preventDefault();
        axiosInstance
            .post('auth/login', {email, password})
            .then(response => {
                localStorage.setItem('accessToken', response.data.access_token);
                localStorage.setItem('userEmail', response.data.user_email);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('identity', response.data.Id);
                this
                    .props
                    .login();
                notify.show(response.data.message, 'success', 4000);
            })
            // error handling
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
        const {password_field, email_field} = this.state;
        const {from} = this.props.location.state || {
            from: {
                pathname: '/dashboard'
            }
        }

        if (this.props.loggedIn) {
            return (<Redirect to={from}/>)
        }
        
        return (
            <div className="background">
                <div id="logbar">
                    <div className="form-group">
                    <i className="fa fa-user-circle fa-5x" style={{color:"#26A69A"}}></i>
                        <div>
                            LOGIN
                        </div>
                        <form onSubmit={this.handleLogin}>
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
                                <div className="input-group-addon pr-4" ><i className='fa fa-envelope'/></div>
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
                                <div className="input-group-addon pr-4" ><i className='fa fa-lock'/></div>
                                <input
                                    type="password"
                                    name="password_field"
                                    className="form-control"
                                    onChange={this.handleInputChange}
                                    value={password_field}
                                    placeholder="Password"/>
                            </div>
                            <br/>

                            <button name="signin" className="btn btn-default btn-lg" id="signin" type="submit">
                               
                                    LOGIN
                            </button>
                        </form>
                        <div className="change_link">
                            Not a member yet ?
                            <Link to="/register">
                                < h4 className="toregister">Register Here</h4>
                            </Link>
                        </div>
                    </div>
                    <a href="#" data-toggle="modal" data-target="#forgot_password">ForgotPassword?</a>
                    <PasswordResetEmail/>
                </div>
                <footer className="footer">
                    <p>&copy; Hadijah 2018</p>
                </footer>
            </div>
        );
    }
}

export default Login;
