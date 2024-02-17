import React from 'react'
import './Title.css'

const Title = () => {
  return (
    <div className='title-container'>
      <h1 className='title'>
        <span className='title-element'>
          elimelt.<i>com</i>
        </span>
        <a
          href='https://linkedin.com/in/elijah-melton'
          className='title-link'
          target='_blank'
          rel='noreferrer'
        >
          LinkedIn
        </a>
        <a
          href='https://github.com/elimelt'
          className='title-link'
          target='_blank'
          rel='noreferrer'
        >
          GitHub
        </a>
      </h1>
    </div>
  )
}

export default Title
