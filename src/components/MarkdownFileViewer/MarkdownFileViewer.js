import React from 'react'
import './MarkdownFileViewer.css'
import Markdown from 'react-markdown'
// import rehypeHighlight from 'rehype-highlight'

const MarkdownFileViewer = ({ content }) => {
  return (
    <div className='markdown-file-viewer'>
      <pre className='md-content'>
        <Markdown>{content}</Markdown>
      </pre>
    </div>
  )
}

export default MarkdownFileViewer
