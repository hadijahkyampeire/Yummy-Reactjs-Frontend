import React from 'react';
import food4 from '../css/images/food4.jpg';
import new1 from '../css/images/new1.jpg';
import new2 from '../css/images/new2.jpg';
import {Clock} from './auth/Landing';

const FoodImages = props => (
  <div
    className={`carousel-item ${props.status}`}
    style={{
    height: document.body.clientHeight - 50
  }}>
    <img
      src={props.image}
      alt={props.text}
      style={{
      width: '100%',
      height: '100%',
      backgroundPosition: 'cover',
    }}
      className="d-block img-fluid"/>
    <div className="carousel-caption" style={{padding:0}}>
      <div id="welcome">
        <h3>YOU LOVE COOKING?</h3>
        <h3 >
          <span>WELCOME TO YUMMY RECIPES
          </span>
        </h3>
        <h4>SIGNUP AND GET STARTED</h4>
        <div>
          <h2>It is
            <Clock/>
          </h2>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Component for executing image slide show on the landing page.
 */
const Slideshow = () => (
  <div className="container-fluid">
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" className="active"/>
        <li data-target="#myCarousel" data-slide-to="1"/>
        <li data-target="#myCarousel" data-slide-to="2"/>
      </ol>
      <div
        className="carousel-inner"
        style={{
        height: '100%'
      }}
        role="listbox">
        <FoodImages status="active" image={food4} text="family meal"/>
        <FoodImages status="" image={new1} text="proteins one"/>
        <FoodImages status="" image={new2} text="proteins"/>
      </div>

      <a
        className="carousel-control-prev"
        href="#myCarousel"
        role="button"
        data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#myCarousel"
        role="button"
        data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  </div>

);
export default Slideshow;
