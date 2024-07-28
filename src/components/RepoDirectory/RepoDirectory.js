import { useEffect, useState, useMemo, useCallback } from 'react'
import Directory from '../Directory/Directory'

const KEY_NAME_ESC = 'Escape'
const KEY_EVENT_TYPE = 'keyup'

function useEscapeKey (handleClose) {
  const handleEscKey = useCallback(
    event => {
      if (event.key === KEY_NAME_ESC) {
        handleClose()
      }
    },
    [handleClose]
  )

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false)

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false)
    }
  }, [handleEscKey])
}



const RepoDirectory = props => {
  const {
    path,
    setPath,
    openedFile,
    setOpenedFile,
    setSelectedFileContent,
    repoOwner = 'elimelt',
    repoName = 'notes'
  } = props

  let returnHome = props.returnHome

  const [directories, setDirectories] = useState([])
  const [files, setFiles] = useState([])

  const dirCache = useMemo(() => new Map(), [])

  useEscapeKey(() =>
    openedFile === null ? handleBackButtonClick() : setOpenedFile(null)
  )

  const filePath = path.split('/').slice(2).join('/') || ''



  useEffect(() => {
    const fetchDirectoryContents = async dir => {
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
        directories: contents
          .filter(item => item.type === 'dir' && item.name[0] !== '.')
          .map(item => item.name),
        files: contents.filter(
          item => item.type === 'file' && item.name[0] !== '.'
        )
      })

      setDirectories(
        contents
          .filter(item => item.type === 'dir' && item.name[0] !== '.')
          .map(item => item.name)
      )
      setFiles(
        contents.filter(item => item.type === 'file' && item.name[0] !== '.')
      )
    }
    fetchDirectoryContents(filePath)
  }, [dirCache, filePath, path, repoName, repoOwner])

  const handleBackButtonClick = () => {
    if (path === '~/' + repoName) {
      returnHome()
      return
    } else if (path === './' + repoName) {
      alert('You should not be able to go back from here')
      return
    }
    const pathArray = path.split('/')
    pathArray.pop()
    setPath(pathArray.join('/'))
  }


  if (path === '~/' && !returnHome)
    return <div>You've got a bug in GithubRepo</div>

  const handleDirectoryClick = dir => {
    setPath(path => `${path}/${dir}`)
  }

  const handleFileClick = async fileName => {
    const filePath = `${path.split('/').slice(2).join('/') || ''}/${fileName}`
    try {
      const oldUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents${filePath}`
      const response = await fetch(oldUrl)
      const data = await response.json()
      const imgExt = ['png', 'jpg', 'jpeg', 'gif', 'svg']
      const parts = fileName.split('.')
      const extension = parts[parts.length - 1]
      const decodedContent = imgExt.includes(extension)
        ? data.content
        : atob(data.content)

      setSelectedFileContent(
        decodedContent
        // .split('\n')                       // removes "escaped" newlines
        // .filter(line => line[0] !== '!')
        // .join('\n')
      )
      setOpenedFile(filePath)
    } catch (error) {
      console.error('Error fetching file content:', error)
    }
  }

  return (
    <Directory
      path={path}
      files={files}
      directories={directories}
      handleDirectoryClick={handleDirectoryClick}
      handleFileClick={handleFileClick}
      handleBackButtonClick={handleBackButtonClick}
      returnHome={returnHome}
    />
  )
}

export default RepoDirectory
