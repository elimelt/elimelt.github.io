import React from 'react';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <div className="about-me-container">
      <h3 className="about-me-header">About me</h3>
      <p className="about-me-text">My name is Elijah Melton and I am an aspiring software engineer.</p>
      <div className="about-me-info">
        <div className="about-me-info-section">
          <h4 className="about-me-info-section-header">Education</h4>
          <p className="about-me-info-section-text">B.S. in Computer Engineering, University of Washington (expected graduation: 2023)</p>
        </div>
        <div className="about-me-info-section">
          <h4 className="about-me-info-section-header">Work Experience</h4>
          <p className="about-me-info-section-text">Software Development Intern, ABC Company, Summer 2022</p>
        </div>
        <div className="about-me-info-section">
          <h4 className="about-me-info-section-header">Skills</h4>
          <ul className="about-me-skills">
            <li>JavaScript</li>
            <li>React</li>
            <li>Node.js</li>
            <li>Python</li>
            <li>SQL</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
