import React from 'react';
import food4 from '../css/images/food4.jpg';
import img1 from '../css/images/img1.jpg';
import food3 from '../css/images/food3.jpg';
import new1 from '../css/images/new1.jpg';
import new2 from '../css/images/new2.jpg';
import { Clock } from './auth/landing';

const FoodImages = props => (
  <div className={`item ${props.status}`} style={{ height: document.body.clientHeight - 50 }} >
    <img src={props.image} alt={props.text} style={{ width: '100%', height: '100%' }} />
    <div className="carousel-caption">
      <div id="welcome">
        <h3>YOU LOVE COOKING?</h3>
        <h3 >
          <span>WELCOME TO YUMMY RECIPES
          </span>
        </h3>
        <h4>SIGNUP AND GET STARTED</h4>
        <div>
          <h2>It is
            <Clock />
          </h2>
        </div>
      </div>
    </div>
  </div>
);

const Slideshow = () => (
  <div className="container-fluid">
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" className="active" />
        <li data-target="#myCarousel" data-slide-to="1" />
        <li data-target="#myCarousel" data-slide-to="2" />
        <li data-target="#myCarousel" data-slide-to="3" />
        <li data-target="#myCarousel" data-slide-to="4" />
      </ol>
      <div className="carousel-inner" style={{ height: '100%' }} >
        <FoodImages status="active" image={food4} text="family meal" />
        <FoodImages status="" image={img1} text="rolex" />
        <FoodImages status="" image={food3} text="proteins" />
        <FoodImages status="" image={new1} text="proteins" />
        <FoodImages status="" image={new2} text="proteins" />
      </div>

      <a className="left carousel-control" href="#myCarousel" data-slide="prev">
        <span className="glyphicon glyphicon-chevron-left" />
        <span className="sr-only">Previous</span>
      </a>
      <a className="right carousel-control" href="#myCarousel" data-slide="next">
        <span className="glyphicon glyphicon-chevron-right" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  </div>


);
export default Slideshow;
