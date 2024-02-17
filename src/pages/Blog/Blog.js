import React from 'react'
import './Blog.css'
import GithubRepo from '../../components/GithubRepo/GithubRepo'

const Blog = () => {
  return (
    <div className='blog'>
      <GithubRepo repoName={'blog'} repoOwner={'elimelt'} />
    </div>
  )
}

export default Blog
