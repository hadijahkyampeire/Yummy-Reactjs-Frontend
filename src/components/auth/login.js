import React, {Component} from 'react';
import axiosInstance from '../Apicalls';
import {notify} from 'react-notify-toast';
import {Link, Redirect} from 'react-router-dom';
import PasswordResetEmail from './resetEmail';
import PropTypes from 'prop-types'

class Login extends Component {
    state = {
        password_field: '',
        email_field: ''
    }

    static propTypes = {
        login: PropTypes.func.isRequired
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleLogin = (event) => {
        const {email_field: email, password_field: password} = this.state;

        event.preventDefault();
        axiosInstance
            .post('auth/login', {email, password})
            .then(response => {
                localStorage.setItem('accessToken', response.data.access_token);
                this
                    .props
                    .login();
                notify.show(response.data.message, 'success', 4000);
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message)
                } else if (error.request) {
                    alert("Request not made")
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
                        <h1>
                            LOGIN
                        </h1>
                        <form onSubmit={this.handleLogin}>
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
                                <i className="glyphicon glyphicon-log-in">
                                    LOGIN</i>
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
