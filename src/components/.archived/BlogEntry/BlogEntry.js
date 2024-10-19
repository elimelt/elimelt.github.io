import React from 'react'
import './BlogEntry.css'

const BlogEntry = ({ blogData }) => {
  const { entryName, date, content } = blogData
  return (
    <div className='blog-entry-container'>
      <div className='blog-entry-header'>
        <h2 className='blog-entry-title'>{entryName}</h2>
        <p className='blog-entry-date'>{date}</p>
      </div>
      <div className='blog-entry-content'>
        {content.map((section, index) => (
          <div key={index} className='blog-entry-section'>
            <h3 className='blog-entry-section-title'>{section.title}</h3>
            <span className='blog-entry-section-body'>{section.body}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogEntry
