import { useEffect, useState, useMemo, useCallback } from 'react';
import CollectionView from '../CollectionView/CollectionView';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

function useEscapeKey(handleClose) {
    const handleEscKey = useCallback((event) => {
    if (event.key === KEY_NAME_ESC) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
}

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

  const dirCache = useMemo(() => new Map(), [])

  useEscapeKey(() => openedFile === null ? handleBackButtonClick() : setOpenedFile(null));

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

    if (dirCache.has(dir)) {
      const { directories, files } = dirCache.get(dir)
      setDirectories(directories)
      setFiles(files)
      return
    }

    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${dir}`
    )

    const contents = await response.json()

    dirCache.set(dir, {
      directories: contents.filter(item => item.type === 'dir' && item.name[0] !== '.').map(item => item.name),
      files: contents.filter(item => item.type === 'file' && item.name[0] !== '.')
    })

    setDirectories(
      contents.filter(item => item.type === 'dir' && item.name[0] !== '.').map(item => item.name)
    )
    setFiles(
      contents.filter(item => item.type === 'file' && item.name[0] !== '.')
    )
  }

  const handleDirectoryClick = dir => {
    setPath(path => `${path}/${dir}`)
  }

  const handleFileClick = async fileName => {
    const filePath = `${path}/${fileName}`
    try {
      const repoOwner = 'elimelt'
      const repoName = 'notes'
      const oldUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents${filePath}`
      const response = await fetch(
        oldUrl
      )
      const data = await response.json()

      const imgExt = ['png', 'jpg', 'jpeg', 'gif', 'svg']
      const parts = fileName.split('.')
      const extension = parts[parts.length - 1]
      const decodedContent = imgExt.includes(extension)
        ? data.content
        : atob(data.content)

      setSelectedFileContent(
        decodedContent
          // .split('\n')
          // .filter(line => line[0] !== '!')
          // .join('\n')
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

export default NotesDirectory;
