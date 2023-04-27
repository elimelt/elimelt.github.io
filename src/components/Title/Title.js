import React from 'react';
import './Title.css';
import logo from '../../logo.png'
const Title = () => {
  return (
    <div className="title-container">

      <h1 className="title">
        <span className="title-element">Elijah.<i>com</i></span> 
        <a 
          href="https://linkedin.com/in/elijah-melton" 
          className="title-link"
          target="_blank"
          rel="nonreferer"
        >
            LinkedIn
        </a>
        <a  
          href="https://github.com/elimelt" 
          className="title-link"
          target="_blank"
          rel="nonreferer"
        >
          GitHub
        </a> 
      </h1>
    </div>
  );
};

export default Title;
