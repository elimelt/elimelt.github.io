import React, { useEffect, useState, useRef } from 'react'
import MarkdownFileViewer from '../../components/MarkdownFileViewer/MarkdownFileViewer'
import CollectionView from '../../components/CollectionView/CollectionView'
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
      contents.filter(item => item.type === 'dir' && item.name[0] !== '.').map(item => item.name)
    )
    setFiles(
      contents.filter(item => item.type === 'file' && item.name.endsWith('.md'))
    )
  }

  const handleDirectoryClick = dir => {
    console.log('dirClick', dir)
    setPath(path => `${path}/${dir}`)
  }

  console.log('files', files)

  const handleFileClick = async fileName => {
    const filePath = `${path}/${fileName}`
    console.log('fileClick', filePath)
    try {
      const repoOwner = 'elimelt'
      const repoName = 'notes'
      const response = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents${filePath}`
      )
      const data = await response.json()
      const decodedContent = atob(data.content)

      setSelectedFileContent(
        decodedContent
          .split('\n')
          .filter(line => line[0] !== '!')
          .join('\n')
      )
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
      <CollectionView
        collection={directories}
        classNames={{
          div: 'directory-item',
          button: 'directory-button',
          span: 'directory-button'
        }}
        clickHandler={handleDirectoryClick}
        BackButton={BackButton}
      />
      <CollectionView
        collection={files.map(file => file.name)}
        classNames={{
          div: 'file-item',
          button: 'file-button',
          span: 'file-name'
        }}
        clickHandler={handleFileClick}
      />
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
          <span className='dir-item'><a style={{textDecoration: "none", color: 'black'}} href="https://github.com/elimelt/notes">notes/</a></span>
        </div>
      )
    }

    const pathArray = ['notes', ...path.substring(1).split('/')]
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
