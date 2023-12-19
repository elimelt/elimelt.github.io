import React, { useEffect, useState, useRef } from 'react'
import MarkdownFileViewer from '../../components/MarkdownFileViewer/MarkdownFileViewer'
import './NotesHome.css'

const NotesDirectory = ({
  path,
  setPath,
  openedFile,
  setOpenedFile,
  selectedFileContent,
  setSelectedFileContent
}) => {
  const [directories, setDirectories] = useState([])
  const [files, setFiles] = useState([])

  useEffect(() => {
    fetchDirectoryContents(path)
  }, [path])

  // const fetchDirectories = async () => {
  //   const repoOwner = 'elimelt';
  //   const repoName = 'notes';
  //   const repoPath = path ? path : '';

  //   const response = await fetch(
  //     `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${repoPath}`
  //   );
  //   const data = await response.json();

  //   console.log('data', data)
  //   const dirs = data
  //     .filter(item => item.type === 'dir')
  //     .map(item => item.name);
  //   setDirectories(dirs);
  // };

  const handleBackButtonClick = () => {
    const pathArray = path.split('/')
    pathArray.pop()
    setPath(pathArray.join('/'))
  }

  const fetchDirectoryContents = async dir => {
    const repoOwner = 'elimelt'
    const repoName = 'notes'
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${dir}`
    )
    const contents = await response.json()

    setDirectories(
      contents.filter(item => item.type === 'dir').map(item => item.name)
    )
    setFiles(contents.filter(item => item.type === 'file'))
  }

  const handleDirectoryClick = dir => {
    setPath(path => `${path}/${dir}`)
  }

  const handleFileClick = async filePath => {
    try {
      const repoOwner = 'elimelt'
      const repoName = 'notes'
      const response = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`
      )
      const data = await response.json()
      const decodedContent = atob(data.content)
      setSelectedFileContent(decodedContent)
      setOpenedFile(filePath)
    } catch (error) {
      console.error('Error fetching file content:', error)
    }
  }

  const BackButton = () => {
    if (path === '') {
      return <></>
    }
    return (
      <div className='directory-item'>
        <button onClick={handleBackButtonClick} className='directory-button'>
          ..
        </button>
      </div>
    )
  }

  return (
    <div className='directory-list'>
      <BackButton />
      {directories.map((dir, index) => (
        <div key={index} className='directory-item'>
          <button
            onClick={() => handleDirectoryClick(dir)}
            className='directory-button'
          >
            {dir}
          </button>
        </div>
      ))}
      {files.map((file, index) => (
        <div key={index} className='file-item'>
          <button
            onClick={() => handleFileClick(file.path)}
            className='file-button'
          >
            <span className='file-name'>{file.name}</span>
          </button>
        </div>
      ))}
    </div>
  )
}

const NotesHome = () => {
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
          <span className='dir-item'>notes/</span>
        </div>
      )
    }
    console.log('path', path)
    const pathArray = ['notes', ...path.substring(1).split('/')]
    console.log('pathArray', pathArray)
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
    <div className='notes-container'>
      <PathHeading />

      <NotesDirectory
        path={path}
        setPath={setPath}
        openedFile={openedFile}
        selectedFileContent={selectedFileContent}
        setOpenedFile={setOpenedFile}
        setSelectedFileContent={setSelectedFileContent}
      />
      {openedFile && (
        <div className='modal-overlay'>
          <div ref={fileViewerRef} className='file-modal'>
            <MarkdownFileViewer content={selectedFileContent} />
          </div>
        </div>
      )}
    </div>
  )
}

export default NotesHome
