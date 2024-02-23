import React, { useState } from 'react'
import FileViewer from '../../components/FileViewer/FileViewer'
import './GithubRepo.css'
import RepoDirectory from '../RepoDirectory/RepoDirectory'

const GithubRepo = props => {
  const { repoOwner, repoName } = props
  let basePath = props.basePath
  let returnHome = props.returnHome

  if (!basePath) basePath = './'

  const [path, setPath] = useState(basePath + repoName)
  const [selectedFileContent, setSelectedFileContent] = useState(null)
  const [openedFile, setOpenedFile] = useState(null)
  // const fileViewerRef = useRef(null)

  // const handleModalClickOutside = event => {
  //   if (
  //     fileViewerRef.current &&
  //     !fileViewerRef.current.contains(event.target)
  //   ) {
  //     setOpenedFile(null)
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleModalClickOutside)
  //   return () => {
  //     document.removeEventListener('mousedown', handleModalClickOutside)
  //   }
  // }, [])

  if (basePath === '~/' && !returnHome)
    return <div>You've got a bug in GithubRepo</div>

  const closeFile = () => {
    setOpenedFile(null)
    setSelectedFileContent(null)
  }

  const PathHeading = () => {
    if (path === './' + repoName) {
      return (
        <div className='dir-heading'>
          <span className='dir-item'>
            <a
              style={{ textDecoration: 'none', color: 'black' }}
              href={`https://github.com/${repoOwner}/${repoName}`}
            >
              {repoName}/
            </a>
          </span>
        </div>
      )
    } else if (path === '~/' + repoName) {
      return (
        <div className='dir-heading'>
          <span className='dir-item'>
            <a
              style={{ textDecoration: 'none', color: 'black' }}
              href={`https://github.com/${repoOwner}/${repoName}`}
            >
              ~/{repoName}/
            </a>
          </span>
        </div>
      )
    }

    const pathArray = [...path.substring(2).split('/')]
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

  if (openedFile) {
    return (
      <div className='repo-container'>
        <button className='close-file' onClick={closeFile}>
          x
        </button>
        {openedFile && (
          <div className='file-viewer-container'>
            <FileViewer
              fileName={openedFile}
              fileContents={selectedFileContent}
            />
          </div>
        )}
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
        returnHome={returnHome}
      />
    </div>
  )
}

export default GithubRepo
