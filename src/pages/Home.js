import React from 'react';
import './Home.css';
import image from '../portrait.JPG'

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="home-heading">
        Welcome to my personal website!
      </h2>
      <div className="home-content">
        <div className="home-description">
          <p className="home-text">
            I'm a computer engineering student at UW Seattle, 
            with a strong interest in back-end and full-stack 
            development. I'm particularly interested in distributed 
            systems and hope to specialize in this field.
          </p>
          <p className="home-text">
            On this website, you can learn more about my projects, 
            academic background, and contact information. Feel free 
            to browse around and get in touch with me if you have 
            any questions or inquiries!
          </p>
        </div>
        <div className="home-image-container">
          <img src={image} alt="Computer Engineering Student" className="home-image"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
