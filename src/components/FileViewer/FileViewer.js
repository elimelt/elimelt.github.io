import React, { useState } from 'react'
import MarkdownFileViewer from '../MarkdownFileViewer/MarkdownFileViewer'
import './FileViewer.css'
import Game from '../Game/Game'

const CodeFileViewer = ({ fileName, fileContents }) => {
  const [isGameActivated, setIsGameActivated] = useState(false)

  const handleGameButtonClick = () => {
    setIsGameActivated(!isGameActivated)
  }

  const fileExtension = fileName.split('.').pop()
  const markdownifiedContents =
    '```' + fileExtension + '\n' + fileContents + '\n```'

  return (
    <div className='code-file-viewer'>
      {isGameActivated ? (
        <Game defaultSnippet={fileContents.split('\n')} />
      ) : (
        <MarkdownFileViewer children={markdownifiedContents} />
      )}
      <button onClick={handleGameButtonClick}>
        {isGameActivated ? 'Hide Game' : 'Show Game'}
      </button>
    </div>
  )
}

const FileViewer = ({ fileName, fileContents }) => {
  const parts = fileName.split('.')
  const extension = parts[parts.length - 1]
  const isImage = ['png', 'jpg', 'jpeg', 'gif'].includes(extension)
  const headingStyle = {
    fontSize: '1.5rem',
    margin: '1rem 0'
  }

  if (isImage)
    return (
      <div className='file-viewer'>
        <h2 style={headingStyle}>{fileName}</h2>
        <img
          src={'data:image/png;charset=utf-8;base64,' + fileContents}
          alt='file'
        />
      </div>
    )

  const isMarkdown = extension === 'md'
  if (isMarkdown)
    return (
      <div className='file-viewer'>
        <MarkdownFileViewer children={fileContents} />
      </div>
    )

  const isCode = ['js', 'java', 'py', 'c', 'cpp', 'kt'].includes(extension)

  if (isCode)
    return (
      <div className='file-viewer'>
        <h2 style={headingStyle}>{fileName}</h2>
        <CodeFileViewer fileName={fileName} fileContents={fileContents} />
      </div>
    )

  const isHTML = extension === 'html'

  if (isHTML)
    return (
      <div className='file-viewer'>
        <h2 style={headingStyle}>{fileName}</h2>
        <div dangerouslySetInnerHTML={{ __html: fileContents }} />
      </div>
    )

  const isPDF = extension === 'pdf'

  if (isPDF) {
    var URL = 'data:application/pdf;base64,' + fileContents
    var blobUrl
    fetch(URL)
      .then(res => res.blob())
      .then(URL.createObjectURL)
      .then(ret => {
        blobUrl = ret
        return blobUrl
      })
      .then(console.log)

    return (
      <div className='file-viewer'>
        <h2 style={headingStyle}>{fileName}</h2>
        <iframe
          title={fileName}
          src={blobUrl}
          width='100%'
          height='100%'
        ></iframe>
      </div>
    )
  }

  return (
    <div className='file-viewer'>
      <h2 style={headingStyle}>{fileName}</h2>
      <p stye={{ color: 'red' }}>Warning: unsupported file</p>
      <p>{fileContents}</p>
    </div>
  )
}

export default FileViewer
