import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import AboutMe from './pages/AboutMe';
import Academics from './pages/Academics';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/about-me" component={AboutMe} />
      <Route path="/academics" component={Academics} />
    </Switch>
  );
};

export default Routes;
