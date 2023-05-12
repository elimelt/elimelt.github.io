import React from 'react'
import './AboutMe.css'

const AboutMe = () => {
  return (
    <div className='about-me-container'>
      <div class='resume'>
        <h2>Education</h2>
        <ul>
          <li>University of Washington Seattle | Graduating June 2025</li>
          <li>B.S. in Electrical and Computer Engineering, GPA: 3.94</li>
        </ul>

        <h2>Experience</h2>
        <ul>
          <li>
            <strong>
              Software Engineering Lead | Nexus UW| Jan 2023 - Present
            </strong>
            <ul>
              <li>
                Helping develop and launch web app for pairing project leads
                with developers. Built with Node.js using React, Express, and
                MongoDB. Took over ownership of SWE team.
              </li>
              <li>
                Implementing UI changes and new features provided by UX and
                design team.
              </li>
              <li>
                Onboarded new developers and improved documentation/process for
                contributing to our GitHub.
              </li>
            </ul>
          </li>
          <li>
            <strong>
              Helpdesk Assistant | Paul G. Allen School of Computer Science |
              Sept 2021 – Jan 2023
            </strong>
            <ul>
              <li>
                Troubleshooted computer hardware/software issues, monitored
                datacenters, managed computing equipment and inventory database.
                Automated server issues reporting process with JavaScript and
                google sheets API.
              </li>
            </ul>
          </li>
          <li>
            <strong>
              Financial Center Intern | Bank of America | June 2021 – Aug 2021
            </strong>
            <ul>
              <li>
                Received formal training and education on project management,
                professionalism, and various soft skills.
              </li>
              <li>
                Presented specification for social media marketing campaign to
                high level executives.
              </li>
            </ul>
          </li>
        </ul>

        <h2>Skills &amp; Abilities</h2>
        <ul>
          <li>Languages: Java, JavaScript, Python, C</li>
          <li>
            Technologies: Git, Linux, Docker, MySQL, MS SQL Server, MongoDB,
            HTML/CSS
          </li>
        </ul>

        <h2>Clubs/Organizations</h2>
        <ul>
          <li>
            <strong>
              Team Lead/Project Manager for Syntext | Husky Coding Project |
              Sept 2022 - Present
            </strong>
            <ul>
              <li>
                Developing Syntext, a website for practicing and improving
                typing speed with programming syntax
              </li>
              <li>
                React.js front end, Express.js and MySQL backend. Designed app
                architecture and have reviewed all pull requests being merged
                into main and production branches, resulting in zero shipped
                bugs since launch.
              </li>
              <li>
                Ensuring comprehensive testing coverage of backend API and
                database functions by utilizing Jest.js for unit testing and
                Docker-Compose to create mock production environments for
                integration testing.
              </li>
            </ul>
          </li>
          <li>
            <strong>
              Web Team Member | Sensors Energy and Automation Laboratory | Aug
              2022 |Jan 2023
            </strong>
            <ul>
              <li>
                Leader of Efficiency Content and Style (ECoS) sub team, fixed
                hosting and authentication issues with app’s API and AWS Elastic
                Beanstalk. Improved documentation for project’s Java Spring Boot
                REST API.
              </li>
              <li>
                Updated and fixed bugs in internal Kanban tool that manages over
                100 lab members.
              </li>
            </ul>
          </li>
        </ul>

        <h2>Projects/Contributions</h2>
        <ul>
          <li>
            Added over 800 new error codes to the latest release of mysql2 by
            scraping the MySQL Server 8.0 source code. Wrote tests for these new
            additions, adhering to the repository's standards. Also an active
            contributor to the issues section of this repository where I use my
            knowledge of MySQL and Node.js to help users troubleshoot their code
            to determine if a patch needs to be made to the module.
          </li>
          <li>
            All of my projects can be viewed on my personal website:{' '}
            <a href='https://elimelt.github.io/elijah-dot-com'>
              elimelt.github.io/elijah-dot-com
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AboutMe

/* <h3 className="about-me-header">About me</h3>
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
      </div> */
