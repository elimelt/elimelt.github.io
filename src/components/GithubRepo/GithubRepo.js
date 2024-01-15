import React, { useEffect, useState, useRef } from 'react'
import FileViewer from '../../components/FileViewer/FileViewer'
import './GithubRepo.css'
import RepoDirectory from '../RepoDirectory/RepoDirectory'

const GithubRepo = ({ repoOwner, repoName }) => {
  const [path, setPath] = useState('')
  const [selectedFileContent, setSelectedFileContent] = useState(null)
  const [openedFile, setOpenedFile] = useState(null)
  const fileViewerRef = useRef(null)

  const handleModalClickOutside = event => {
    if (
      fileViewerRef.current &&
      !fileViewerRef.current.contains(event.target)
    ) {
      setOpenedFile(null)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleModalClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleModalClickOutside)
    }
  }, [])

  const PathHeading = () => {
    if (path === '') {
      return (
        <div className='dir-heading'>
          <span className='dir-item'><a style={{textDecoration: "none", color: 'black'}} href={`https://github.com/${repoOwner}/${repoName}`}>{repoName}/</a></span>
        </div>
      )
    }

    const pathArray = [repoName, ...path.substring(1).split('/')]
    return (
      <div className='dir-heading'>
        {pathArray.map((dir, index) => (
          <span key={index} className='path-item'>
            {dir + '/'}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className='repo-container'>
      <PathHeading />

      <RepoDirectory
        path={path}
        setPath={setPath}
        openedFile={openedFile}
        selectedFileContent={selectedFileContent}
        setOpenedFile={setOpenedFile}
        setSelectedFileContent={setSelectedFileContent}
        repoOwner={repoOwner}
        repoName={repoName}
      />
      {openedFile && (
        <div className='modal-overlay'>
          <div ref={fileViewerRef} className='file-modal'>
            <FileViewer fileName={openedFile} fileContents={selectedFileContent} />
          </div>
        </div>
      )}
    </div>
  )
}

export default GithubRepo
