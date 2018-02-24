import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Slideshow from '../slideshow';


class Landing extends React.Component {
  static propTypes = {
    loggedIn:PropTypes.bool,
  }

  static defaultProps = {
    loggedIn:false,
  }
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.history.push('/dashboard');
    }
  }
  render() {
    return (
      <Slideshow />
    );
  }
}

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    const currentTime = new Date();
    this.state = {
      hours: currentTime.getHours(),
      minutes: currentTime.getMinutes(),
      seconds: currentTime.getSeconds(),
      ampm: currentTime.getHours() >= 12
        ? 'pm'
        : 'am',
    };
    this.setTimer();
  }

  setTimer() {
    setTimeout(this.updateClock.bind(this), 1000);
  }
  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
  updateClock() {
    const currentTime = new Date();
    this.setState({
      hours: currentTime.getHours(),
      minutes: currentTime.getMinutes(),
      seconds: currentTime.getSeconds(),
      ampm: currentTime.getHours() >= 12
        ? 'pm'
        : 'am',
    }, this.setTimer);
  }

  render() {
    const {
      hours, minutes, seconds, ampm,
    } = this.state;
    return (
      <div className="clock">
        {hours === 0
          ? 12
          : (hours > 12)
            ? hours - 12
            : hours
}:{minutes > 9
          ? minutes
          : `0${minutes}`
}:{seconds > 9
          ? seconds
          : `0${seconds}`
} {ampm}
      </div>
    );
  }
}

export const Nav = props => (
  <div id="header">
    <div className="container">
      <div className="logo" />
      <div id="author">
        <h3>Recipes by KH</h3>
      </div>
      <div id="menu">
        {!props.loggedIn
          ? (
            <Fragment>
              <Link to="/login" id="signin" className="btn btn-nav">
              <i className="fa fa-sign-in "/>Login</Link>
              <Link to="/register" id="signup" className="btn btn-nav">
              <i className="fa fa-user-plus "/>
                Signup
              </Link>
              <Link to="/" id="homebtn" className="btn btn-nav">
              <i className="fa fa-home "/>Home</Link>
            </Fragment>
          )
          : (
            <div>
              <Link  to="/dashboard" className="btn btn-primary">
                  Categories
                  <i className="glyphicon glyphicon-cutlery"/>
              </Link>
              <Link className="btn btn-success" to="/about">About Us <i className="glyphicon glyphicon-tags"/></Link>
              
              <Link className="btn btn-danger" to="/" onClick={(e) => { props.logout(e); }}>
              Logout <i className="fa fa-sign-out"/></Link>
            </div>

          )}
      </div>
    </div>
  </div>

);

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Landing;
