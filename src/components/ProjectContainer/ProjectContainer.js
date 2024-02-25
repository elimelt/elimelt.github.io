import React, { useState } from 'react'
import styled from 'styled-components'
import projects from '../../data/projectData'
import GithubRepo from '../GithubRepo/GithubRepo'

const ProjectsContainer = styled.div`
  background-color: #ffffff;
  padding: 10%;
  padding-top: 2%;
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
  box-shadow: 0 2px 2px 2px rgba(110, 110, 110, 0.5);
  cursor: pointer;
  transition: all 3s ease;

  h3 {
    margin-top: 0;
  }

  p {
    margin-bottom: 15px;
    overflow: visible;
    display: block;
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
  margin-top: 20px;
  border-radius: 8px;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  width: 75%;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
`

const ProjectContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  let githubRepo
  let githubOwner
  if (selectedProject !== null) {
    const githubUrl = projects[selectedProject].githubURL.split('/')
    githubRepo = githubUrl[githubUrl.length - 1]
    githubOwner = githubUrl[githubUrl.length - 2]
  }

  const openModal = id => {
    setIsModalOpen(true)
    setSelectedProject(id)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }
  return (
    <ProjectsContainer>
      <h2>Projects</h2>
      <ProjectsGrid>
        {projects.map(project => (
          <ProjectCard key={project.id} onClick={() => openModal(project.id)}>
            <h3>{project.name}</h3>
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
            {project.description.props.children[0]}
          </ProjectCard>
        ))}
      </ProjectsGrid>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            {selectedProject !== null && (
              <>
                <h3>{projects[selectedProject].name}</h3>
                <strong>Tech Stack:</strong>{' '}
                {projects[selectedProject].techStack}
                {projects[selectedProject].description}
                <ProjectLinks>
                  {projects[selectedProject].githubURL && (
                    <a
                      href={projects[selectedProject].githubURL}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      GitHub
                    </a>
                  )}
                  {projects[selectedProject].demoURL && (
                    <a
                      href={projects[selectedProject].demoURL}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Demo
                    </a>
                  )}
                </ProjectLinks>
                {projects[selectedProject].demoGIF && (
                  <DemoGIF
                    src={projects[selectedProject].demoGIF}
                    alt={`${projects[selectedProject].name} Demo`}
                  />
                )}
                {projects[selectedProject].githubURL && (
                  <GithubRepo repoOwner={githubOwner} repoName={githubRepo} />
                )}
              </>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </ProjectsContainer>
  )
}

export default ProjectContainer
