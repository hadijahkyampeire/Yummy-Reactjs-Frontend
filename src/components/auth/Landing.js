import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Slideshow from '../SlideShow';
import Profile from './Profile';

/**
 * Component for landing page.
 * @author [Hadijah kyampeire](https://github.com/hadijahkyampeire/Yummy_Reactjs_frontend)
 */
class Landing extends React.Component {
  // prop validation
  static propTypes = {
    loggedIn: PropTypes.bool
  }

  static defaultProps = {
    loggedIn: false
  }
  componentDidMount() {
    if (this.props.loggedIn) {
      this
        .props
        .history
        .push('/dashboard');
    }
  }
  render() {
    return (<Slideshow/>);
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
        : 'am'
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
        : 'am'
    }, this.setTimer);
  }

  render() {
    const {hours, minutes, seconds, ampm} = this.state;
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

const linkTextStyles = {
  color: 'white'
}

const activeLinkStyles ={
color: 'white',
borderBottomColor:'white'
}
/**
 * Displays the navigation bar
 * @param {object} props - Contains properties to pass to the Nav component
 */
export const Nav = props => (
  <nav
    className="navbar navbar-toggleable-md navbar-light"
    style={{
    backgroundColor: "#009688",
    borderRadius: 0,
    marginBottom: 0,
    paddingBottom: 0,
    paddingTop: 0,
  }}>

    <button
      className="navbar-toggler navbar-toggler-right"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand" href="#">
    <div className="logo"/>
    Recipes by KH
  </a>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02" style={{marginBottom:0}}>
      {!props.loggedIn
        ? (
          <ul
            className="navbar-nav ml-auto"
            style={{
            color: 'white'
          }}>
            <li className="nav-item">
              <NavLink to="/" exact className="nav-link" style={linkTextStyles}
              activeStyle={activeLinkStyles}>
                <i className="fa fa-home "/> {' '}Home</NavLink>

            </li>
            <li className="nav-item">
              <NavLink
                style={linkTextStyles}
                to="/login"
                id="signinh"
                className="nav-link"
                activeStyle={activeLinkStyles} activeStyle={activeLinkStyles}>
                <span><i className="fa fa-sign-in "/> Login</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/register"
                id="signupj"
                className="nav-link"
                style={linkTextStyles} activeStyle={activeLinkStyles}>
                <i className="fa fa-user-plus "/> {' '}Signup
              </NavLink>

            </li>
          </ul>
        )
        : (
          <ul
            className="navbar-nav ml-auto"
            style={{
            color: 'white'
          }}>
          <li className="nav-item">
              <NavLink to="/#" data-toggle="modal" data-target="#userprofile" exact className="nav-link" style={linkTextStyles}
              activeStyle={activeLinkStyles}>
                <i className="fa fa-user "/> {' '}{localStorage.getItem('username')}{' '}
                <i className="fa fa-angle-double-down"/>
                </NavLink>

            </li>
            <li className="nav-item">
              <NavLink to="/dashboard" className="nav-link" style={linkTextStyles} activeStyle={activeLinkStyles}>
                Categories {' '}<i className="fa fa-coffee"/>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" style={linkTextStyles} 
              activeStyle={activeLinkStyles}>About Us {' '}<i className="fa fa-info-circle"/></NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={linkTextStyles}
                activeStyle={activeLinkStyles}
                className="nav-link"
                to="!#"
                onClick={(e) => {
                props.logout(e);
              }}>
                Logout{' '}
                <i className="fa fa-sign-out"/></NavLink>
            </li>
          </ul>

        )}
    </div>
    <Profile/>
  </nav>
);

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default Landing;
