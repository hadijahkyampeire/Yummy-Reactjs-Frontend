import React, {Component} from 'react';
import axiosInstance from '../Apicalls';
import {notify} from 'react-notify-toast'
import {Link, Redirect} from 'react-router-dom';

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
        axiosInstance
            .post('auth/register', {email, password})
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
        
        if(this.props.loggedIn){
            // if one is loggedin it should not show signup anymore
            return(<Redirect to='/dashboard'/>)
        }

        return (
            <div className="background">
                <div id="signbar">
                    <h1>
                        CREATE AN ACCOUNT </h1>
                    <form onSubmit={this.handleRegister}>
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
                        <div className="row">
                            <div className="col-sm-6 text-left">
                                <Link to="/"><input className="btn-btn-default" value="Cancel" type="button"/></Link>
                            </div>
                            <div className="col-sm-6 text-right">
                                <input name="signup" id="signup" value="Signup" className="btn btn-nav" type="submit"/>
                            </div>
                        </div>

                        <div className="change_link">
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
