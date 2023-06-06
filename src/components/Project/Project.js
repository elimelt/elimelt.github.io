import React, { useState } from 'react';

import './Project.css';

const Project = ({ info }) => {
  const { name, description, techStack, githubURL, demoURL, demoGIF } = info;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="project-container">
      <div className="project-info">
        <h2 className="project-name">{name}</h2>
        <p className="project-tech-stack">Tech stack: {techStack}</p>
        {isExpanded && <p className="project-description">{description}</p>}
      </div>

      <div className="project-links">
        <a
          className="project-link"
          href={githubURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          className="project-link"
          href={demoURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Demo
        </a>
      </div>

      {isExpanded && (
        <div className="project-details">
          <div className="project-demo">
            <img
              className="project-gif"
              src={demoGIF}
              alt={`Demo of ${name}`}
            />
          </div>
        </div>
      )}

      <button onClick={toggleExpansion}>
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

export default Project;
