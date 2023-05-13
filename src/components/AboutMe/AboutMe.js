import React from 'react'
import './AboutMe.css'

const AboutMe = () => {
  return (
    <div className='about-me-container'>
      <div class='resume'>
        <div class='education-container'>
          <h2 class='section-heading'>Education</h2>
          <div class='education-details'>
            <div class='education-item'>
              <h3 class='institution-name'>University of Washington Seattle</h3>
              <p class='education-date'>Graduating June 2025</p>
            </div>
            <div class='education-item'>
              <h4 class='degree'>B.S. in Computer Engineering</h4>
              <p class='gpa'>GPA: 3.94</p>
            </div>
          </div>
        </div>

        <div class='experience-container'>
          <h2 class='section-heading'>Experience</h2>
          <div class='experience-item'>
            <h3 class='position'>Software Engineering Lead</h3>
            <p class='company'>Nexus UW</p>
            <p class='date'>Jan 2023 - Present</p>
            <ul class='responsibilities'>
              <li>
                Helped develop and launch a web app for pairing project leads
                with developers. Built with Node.js using React, Express, and
                MongoDB. Took over ownership of SWE team.
              </li>
              <li>
                Implemented UI changes and new features provided by UX and
                design team.
              </li>
              <li>
                Onboarded new developers and improved documentation/process for
                contributing to our GitHub.
              </li>
            </ul>
          </div>
          <div class='experience-item'>
            <h3 class='position'>Team Lead/Project Manager</h3>
            <p class='company'>Husky Coding Project</p>
            <p class='date'>Sept 2022 - Present</p>
            <ul class='responsibilities'>
              <li>
                Developing Syntext, a website for practicing and improving
                typing speed with programming syntax
              </li>
              <li>React.js front end, Express.js and MySQL backend</li>
              <li>
                Designed app architecture and have reviewed all pull requests
                being merged into main and production branches, resulting in
                zero shipped bugs since launch
              </li>
              <li>
                Ensuring comprehensive testing coverage of backend API and
                database functions by utilizing Jest.js for unit testing and
                Docker-Compose to create mock production environments for
                integration testing
              </li>
            </ul>
          </div>
          <div class='experience-item'>
            <h3 class='position'>Web Team Member</h3>
            <p class='company'>Sensors Energy and Automation Laboratory</p>
            <p class='date'>Aug 2022 - Jan 2023</p>
            <ul class='responsibilities'>
              <li>
                Leader of Efficiency Content and Style (ECoS) sub team, fixed
                hosting and authentication issues with app’s API and AWS Elastic
                Beanstalk. Improved documentation for project’s Java Spring Boot
                REST API.
              </li>
              <li>
                Updated and fixed bugs in internal Kanban tool that manages over
                100 lab members
              </li>
            </ul>
          </div>

          <div class='experience-item'>
            <h3 class='position'>Helpdesk Assistant</h3>
            <p class='company'>Paul G. Allen School of Computer Science</p>
            <p class='date'>Sept 2021 – Jan 2023</p>
            <ul class='responsibilities'>
              <li>
                Troubleshot computer hardware/software issues, monitored
                datacenters, managed computing equipment and inventory database.
                Automated server issues reporting process with JavaScript and
                Google Sheets API.
              </li>
            </ul>
          </div>
          <div class='experience-item'>
            <h3 class='position'>Financial Center Intern</h3>
            <p class='company'>Bank of America</p>
            <p class='date'>June 2021 – Aug 2021</p>
            <ul class='responsibilities'>
              <li>
                Received formal training and education on project management,
                professionalism, and various soft skills.
              </li>
              <li>
                Presented specification for social media marketing campaign to
                high-level executives.
              </li>
            </ul>
          </div>
        </div>

        <div class='skills-container'>
          <h2 class='section-heading'>Skills &amp; Abilities</h2>
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
        </div>

        <div className='contributions-container'>
          <h2 class='section-heading'>Contributions</h2>
          <p class='company'>
            <a href='https://github.com/sidorares/node-mysql2'>node-mysql2</a>
          </p>
          <ul>
            <li>
              Added over 800 new error codes to the latest release of mysql2 by
              scraping the MySQL Server 8.0 source code.
            </li>
            <li>
              Wrote tests for these new additions, adhering to the repository's
              standards.
            </li>
            <li>
              Active contributor to the issues section of this repository where
              I use my knowledge of MySQL and Node.js to help users troubleshoot
              their code to determine if a patch needs to be made to the module.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
