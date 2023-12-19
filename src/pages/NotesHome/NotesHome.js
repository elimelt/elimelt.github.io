import React, { useEffect, useState, useRef } from 'react'
import MarkdownFileViewer from '../../components/MarkdownFileViewer/MarkdownFileViewer'
import './NotesHome.css'

const NotesHome = () => {
  const [directories, setDirectories] = useState([])
  const [directoryContents, setDirectoryContents] = useState({})
  const [selectedFileContent, setSelectedFileContent] = useState(null)
  const [openedFile, setOpenedFile] = useState(null)
  const [openedDirectories, setOpenedDirectories] = useState({})
  const fileViewerRef = useRef(null)

  useEffect(() => {
    const fetchDirectories = async () => {
      const repoOwner = 'elimelt'
      const repoName = 'notes'
      const repoPath = ''

      const response = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${repoPath}`
      )
      const data = await response.json()

      const dirs = data
        .filter(item => item.type === 'dir')
        .map(item => item.name)
      setDirectories(dirs)
    }

    fetchDirectories()
  }, [])

  const fetchDirectoryContents = async dir => {
    const repoOwner = 'elimelt'
    const repoName = 'notes'
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${dir}`
    )
    const data = await response.json()
    const filenames = data
      .filter(item => item.type === 'file' && item.name.endsWith('.md'))
      .map(item => item.name)
    setDirectoryContents(prevContents => ({
      ...prevContents,
      [dir]: filenames
    }))
  }

  const toggleDirectory = dir => {
    setOpenedDirectories(prevState => ({
      ...prevState,
      [dir]: !prevState[dir]
    }))
  }

  const handleDirectoryClick = dir => {
    if (!directoryContents[dir]) {
      fetchDirectoryContents(dir)
    }
    toggleDirectory(dir)
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

  return (
    <div className='notes-container'>
      <h1>Notes Directory</h1>
      <div className='directory-list'>
        {directories.map((dir, index) => (
          <div key={index} className='directory-item'>
            <button
              onClick={() => handleDirectoryClick(dir)}
              className='directory-button'
            >
              {dir}
            </button>
            {directoryContents[dir] && openedDirectories[dir] && (
              <ul className='file-list'>
                {directoryContents[dir].map((file, idx) => (
                  <li
                    key={idx}
                    className={`file-item ${
                      openedFile === `${dir}/${file}` ? 'active' : ''
                    }`}
                    onClick={() => handleFileClick(`${dir}/${file}`)}
                  >
                    <span className='file-name'>{file}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
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
