import React from 'react';
import './Project.css';

const Project = ({ info }) => {
  const { name, description, techStack, githubUrl, demoUrl } = info;

  
  return (
    <div className="project-container">
      <h2 className="project-name">{name}</h2>
      <p className="project-description">{description}</p>
      <p className="project-tech-stack">Tech stack: {techStack}</p>
      <a className="project-link" href={githubUrl}>Github</a>
      {demoUrl && <a className="project-link" href={demoUrl}>Live Demo</a>}
    </div>
  );
};

export default Project;
