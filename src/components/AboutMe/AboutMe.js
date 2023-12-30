import React, { useEffect, useState } from "react";
import "./AboutMe.css";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

const AboutMe = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [isEducationExpanded, setIsEducationExpanded] = useState(true);
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);
  const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);
  const [isContributionsExpanded, setIsContributionsExpanded] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleToggleEducation = () => {
    setIsEducationExpanded(!isEducationExpanded);
    setIsExperienceExpanded(false);
    setIsSkillsExpanded(false);
    setIsContributionsExpanded(false);
  };

  const handleToggleExperience = () => {
    setIsExperienceExpanded(!isExperienceExpanded);
    setIsEducationExpanded(false);
    setIsSkillsExpanded(false);
    setIsContributionsExpanded(false);
  };

  const handleToggleSkills = () => {
    setIsSkillsExpanded(!isSkillsExpanded);
    setIsEducationExpanded(false);
    setIsExperienceExpanded(false);
    setIsContributionsExpanded(false);
  };

  const handleToggleContributions = () => {
    setIsContributionsExpanded(!isContributionsExpanded);
    setIsEducationExpanded(false);
    setIsExperienceExpanded(false);
    setIsSkillsExpanded(false);
  };

  return (
    <div className="about-me-container">
      <div className="resume">
        <div className="education-container">
          {isEducationExpanded ? (
            <h2 className="section-heading-exp" onClick={handleToggleEducation}>
              Education
            </h2>
          ) : (
            <h2 className="section-heading" onClick={handleToggleEducation}>
              Click to view my education
            </h2>
          )}
          {isEducationExpanded && (
            <div className="education-details">
              <div className="education-item">
                <h3 className="institution-name">
                  {window.innerWidth < 700 ? "UW" : "University of Washington"}
                </h3>
                <p className="education-date">Graduating June 2025</p>
              </div>
              <div className="education-item">
                <h4 className="degree">
                  {window.innerWidth < 600
                    ? "B.S. in Comp. Eng."
                    : "B.S. in Computer Engineering"}
                </h4>
                <p className="gpa">GPA: 3.94</p>
              </div>
            </div>
          )}
        </div>

        <div className="experience-container">
          {isExperienceExpanded ? (
            <h2
              className="section-heading-exp"
              onClick={handleToggleExperience}
            >
              Experience
            </h2>
          ) : (
            <h2 className="section-heading" onClick={handleToggleExperience}>
              Click to view my experience
            </h2>
          )}

          {isExperienceExpanded && (
            <>
              <div className="experience-item">
                <h3 className="position">Software Engineering Lead</h3>
                <p className="company">Nexus UW</p>
                <p className="date">Jan 2023 - Present</p>
                <ul className="responsibilities">
                  <li>
                    Helped develop and launch a web app for pairing project
                    leads with developers. Built with Node.js using React,
                    Express, and MongoDB. Took over ownership of SWE team.
                  </li>
                  <li>
                    Implemented UI changes and new features provided by UX and
                    design team.
                  </li>
                  <li>
                    Onboarded new developers and improved documentation/process
                    for contributing to our GitHub.
                  </li>
                </ul>
              </div>
              <div className="experience-item">
                <h3 className="position">Team Lead/Project Manager</h3>
                <p className="company">Husky Coding Project</p>
                <p className="date">Sept 2022 - Present</p>
                <ul className="responsibilities">
                  <li>
                    Developing Syntext, a website for practicing and improving
                    typing speed with programming syntax
                  </li>
                  <li>React.js front end, Express.js and MySQL backend</li>
                  <li>
                    Designed app architecture and have reviewed all pull
                    requests being merged into main and production branches,
                    resulting in zero shipped bugs since launch
                  </li>
                  <li>
                    Ensuring comprehensive testing coverage of backend API and
                    database functions by utilizing Jest.js for unit testing and
                    Docker-Compose to create mock production environments for
                    integration testing
                  </li>
                </ul>
              </div>
              <div className="experience-item">
                <h3 className="position">Web Team Member</h3>
                <p className="company">
                  Sensors Energy and Automation Laboratory
                </p>
                <p className="date">Aug 2022 - Jan 2023</p>
                <ul className="responsibilities">
                  <li>
                    Leader of Efficiency Content and Style (ECoS) sub team,
                    fixed hosting and authentication issues with app’s API and
                    AWS Elastic Beanstalk. Improved documentation for project’s
                    Java Spring Boot REST API.
                  </li>
                  <li>
                    Updated and fixed bugs in internal Kanban tool that manages
                    over 100 lab members
                  </li>
                </ul>
              </div>
              <div className="experience-item">
                <h3 className="position">Helpdesk Assistant</h3>
                <p className="company">
                  Paul G. Allen School of Computer Science
                </p>
                <p className="date">Sept 2021 – Jan 2023</p>
                <ul className="responsibilities">
                  <li>
                    Troubleshot computer hardware/software issues, monitored
                    datacenters, managed computing equipment and inventory
                    database. Automated server issues reporting process with
                    JavaScript and Google Sheets API.
                  </li>
                </ul>
              </div>
              <div className="experience-item">
                <h3 className="position">Financial Center Intern</h3>
                <p className="company">Bank of America</p>
                <p className="date">June 2021 – Aug 2021</p>
                <ul className="responsibilities">
                  <li>
                    Received formal training and education on project
                    management, professionalism, and various soft skills.
                  </li>
                  <li>
                    Presented specification for social media marketing campaign
                    to high-level executives.
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="skills-container">
          {isSkillsExpanded ? (
            <h2 className="section-heading-exp" onClick={handleToggleSkills}>
              Skills &amp; Abilities
            </h2>
          ) : (
            <h2 className="section-heading" onClick={handleToggleSkills}>
              Click to view my skills &amp; abilities
            </h2>
          )}
          {isSkillsExpanded && (
            <>
              <h4>Languages</h4>
              <ul>
                <li>Java</li>
                <li>JavaScript</li>
                <li>Python</li>
                <li>C</li>
              </ul>
              <h4>Technologies</h4>
              <ul>
                <li>Git</li>
                <li>Linux</li>
                <li>Docker</li>
                <li>MySQL</li>
                <li>MS SQL Server</li>
                <li>MongoDB</li>
                <li>HTML/CSS</li>
              </ul>
            </>
          )}
        </div>

        <div className="contributions-container">
          {isContributionsExpanded ? (
            <h2
              className="section-heading-exp"
              onClick={handleToggleContributions}
            >
              Contributions
            </h2>
          ) : (
            <h2 className="section-heading" onClick={handleToggleContributions}>
              Click to view my open source contributions
            </h2>
          )}
          {isContributionsExpanded && (
            <>
              <p className="company">
                <a href="https://github.com/sidorares/node-mysql2">
                  node-mysql2
                </a>
              </p>
              <ul>
                <li>
                  Added over 800 new error codes to the latest release of mysql2
                  by scraping the MySQL Server 8.0 source code.
                </li>
                <li>
                  Wrote tests for these new additions, adhering to the
                  repository's standards.
                </li>
                <li>
                  Active contributor to the issues section of this repository
                  where I use my knowledge of MySQL and Node.js to help users
                  troubleshoot their code to determine if a patch needs to be
                  made to the module.
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
