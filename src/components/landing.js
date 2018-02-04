import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="background-image">
    <div id="header">
      <div id="author"><h3>React Yummy Recipes by KH</h3></div>
      <div id="menu">
        <Link to="/login"><input type="button" id="signin" name="signin" value="LOGIN" /></Link>
        <Link to="/register"><input type="button" id="signup" name="signup" value="SIGNUP " /> </Link>
      </div>
    </div>

    <div id="welcome">
      <h4>You love cooking! then</h4>
      <h3 ><span>WELCOME TO YUMMY RECIPES </span></h3>
      <h4>Go ahead and signup to expore</h4>
    </div>
  </div>
);

export default Landing;
