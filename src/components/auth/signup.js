import React, {Component} from 'react';
import axios from 'axios';
import {notify} from 'react-notify-toast'
import {Link} from 'react-router-dom';

class Signup extends Component {
    state = {
        password_field: '',
        email_field: ''
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleRegister = (event) => {
        const {email_field: email, password_field: password} = this.state;

        event.preventDefault();
        axios
            .post('http://127.0.0.1:5000/api/v1/auth/register', {email, password})
            .then(response => {
                notify.show(response.data.message, 'success', 4000);
                this
                    .props
                    .history
                    .push('/login');
                console.log(response);
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

        return (
            <div className="background">
                <div id="signbar">
                    <h1>
                        CREATE AN ACCOUNT TO GET STARTED</h1>
                    <form onSubmit={this.handleRegister}>
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
                        <div className="buttons">
                        <input name="signup" id="signup" value="Signup" type="submit"/>
                        <Link to="/"><input name="signup" className="btn-btn-default" value="Cancel" type="button"/></Link>
                        </div>

                        <div class="change_link">
                            Already a member ?
                            <Link to="/login">log in
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}
export default Signup;
