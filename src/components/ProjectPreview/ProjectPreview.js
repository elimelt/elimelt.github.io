import React, { useState } from 'react'
import './ProjectPreview.css'

const ProjectPreview = ({ info, setIsExpanded }) => {
  const { name, techStack, githubURL, demoURL } = info


  return (
    <div className='project-container'>
      <div className='project-info'>
        <h2 className='project-name'>{name}</h2>
        <p className='project-tech-stack'>Tech stack: {techStack}</p>
      </div>

      <div className='project-links'>
        <a
          className='project-link'
          href={githubURL}
          target='_blank'
          rel='noopener noreferrer'
        >
          Github
        </a>
        <a
          className='project-link'
          href={demoURL}
          target='_blank'
          rel='noopener noreferrer'
        >
          Demo
        </a>
      </div>

      <button onClick={()=>setIsExpanded(true)}>
        Show More
      </button>
    </div>
  )
}

export default ProjectPreview
