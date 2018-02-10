import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  render() {
    return (
      <div className="background-image">
        <div id="welcome">
          <h4>You love cooking! then</h4>
          <h3 ><span>WELCOME TO YUMMY RECIPES </span></h3>
          <h4>Go ahead and signup to expore</h4>
          <div>
            <h2>It is <Clock /></h2>
          </div>
        </div>
      </div>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    const currentTime = new Date();
    this.state = {
      hours: currentTime.getHours(),
      minutes: currentTime.getMinutes(),
      seconds: currentTime.getSeconds(),
      ampm: currentTime.getHours() >= 12 ? 'pm' : 'am',


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
      ampm: currentTime.getHours() >= 12 ? 'pm' : 'am',

    }, this.setTimer);
  }

  render() {
    const {
      hours, minutes, seconds, ampm,
    } = this.state;
    return (
      <div className="clock">
        {
    hours === 0 ? 12 :
    (hours > 12) ? hours - 12 : hours
  }:{
    minutes > 9 ? minutes : `0${minutes}`
  }:{
    seconds > 9 ? seconds : `0${seconds}`
  } {
    ampm}
      </div>
    );
  }
}
export const Nav = () => (
  <div id="header">
    <div className="container">
    <div className="logo" />
    <div id="author"><h3>Recipes by KH</h3></div>
    <div id="menu">
      <Link to="/login" id="signin" className="btn btn-nav">Login</Link>
      <Link to="/register" id="signup" className="btn btn-nav"> Signup</Link>
      <div className="dropdown">
        <span
          className="btn btn-primary dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Options:
        </span>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a className="dropdown-item" href="/">Logout</a>
          <a className="dropdown-item" href="/about">About</a>
          <a className="dropdown-item" href="/dashboard"> View categories</a>
        </div>
      </div>
    </div>
  </div>
  </div>

);
export default Landing;
