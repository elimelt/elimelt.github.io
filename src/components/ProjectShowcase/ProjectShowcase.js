import React from 'react';
import Project from '../Project/Project.js';
import projects from './projectData';
import './ProjectShowcase.css';

const ProjectShowcase = () => {
  return (
    <div className="project-showcase">
      {projects.map((project) => (
        <div className="project" key={project.id}>
          <Project info={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectShowcase;
