import React from 'react';
import { Route, Link } from 'react-router-dom';
// import ProjectShowcase from './components/ProjectShowcase/ProjectShowcase.js';
// import Title from './components/Title/Title.js';
// import AboutMe from './components/AboutMe/AboutMe.js';
import Navbar from './Navbar';
import Routes from './Routes';

const App = () => {

  

  return (
    <div>
      <Navbar />
      <Routes />
      {/* <Title />
      <AboutMe />
      <ProjectShowcase />  */}
    </div>
  );
};

export default App;
