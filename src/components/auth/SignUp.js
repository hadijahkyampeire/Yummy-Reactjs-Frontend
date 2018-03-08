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
                    notify.show(error.response.data.message, 'error', 3000)
                } else if (error.request) {
                    notify.show("Request not made", 'error', 3000)
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
                        <div >
                    <i className="fa fa-user-circle fa-5x" style={{color:"#26A69A"}}></i>
                    <div> REGISTER </div>
                </div>
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
