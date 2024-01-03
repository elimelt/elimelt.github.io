import React, { useState } from 'react'
import styled from 'styled-components'
import projects from '../../data/projectData'

const SkillsContainer = styled.div`
  padding: 50px;
  background-color: #f4f4f4;
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`

const ProjectCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 3s ease; // Transition for smooth animation

  h3 {
    margin-top: 0;
  }

  p {
    margin-bottom: 15px;
    overflow: visible; // Ensures text isn't truncated
    display: block; // Ensures text wraps within its container
  }

  &.expanded {
    grid-column: 1 / -1; // Span across all columns
    transition: all 3s ease;
  }
`

const ProjectLinks = styled.div`
  display: flex;
  gap: 10px;

  a {
    text-decoration: none;
    color: #0077cc;
    &:hover {
      text-decoration: underline;
    }
  }
`

const DemoGIF = styled.img`
  width: 100%;
  border-radius: 8px;
`

const ProjectContainer = () => {
  const [expandedProject, setExpandedProject] = useState(null)

  const toggleExpand = id => {
    if (expandedProject === id) {
      setExpandedProject(null)
    } else {
      setExpandedProject(id)
    }
  }

  return (
    <SkillsContainer>
      <h2>Projects</h2>
      <ProjectsGrid>
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            onClick={() => toggleExpand(project.id)}
            className={expandedProject === project.id ? 'expanded' : ''}
          >
            <h3>{project.name}</h3>
            {expandedProject === project.id ? (
              <>
                <p>
                  <strong>Tech Stack:</strong> {project.techStack}
                </p>
                <p>{project.description}</p>
                <ProjectLinks>
                  {project.githubURL && (
                    <a
                      href={project.githubURL}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      GitHub
                    </a>
                  )}
                  {project.demoURL && (
                    <a
                      href={project.demoURL}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Demo
                    </a>
                  )}
                </ProjectLinks>
                {project.demoGIF && (
                  <DemoGIF src={project.demoGIF} alt={`${project.name} Demo`} />
                )}
              </>
            ) : (
              <>
                <ProjectLinks>
                  {project.githubURL && (
                    <a
                      href={project.githubURL}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      GitHub
                    </a>
                  )}
                  {project.demoURL && (
                    <a
                      href={project.demoURL}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Demo
                    </a>
                  )}
                </ProjectLinks>

                <p>{project.description.props.children[0]}</p>
              </>
            )}
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </SkillsContainer>
  )
}

export default ProjectContainer
