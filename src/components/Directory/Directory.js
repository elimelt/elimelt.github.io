import CollectionView from '../CollectionView/CollectionView'

const Directory = props => {
  const {
    path,
    files,
    directories,
    handleDirectoryClick,
    handleFileClick,
    handleBackButtonClick
  } = props
  let returnHome = props.returnHome

  if (!returnHome && path === '~/')
    return <div>You've got a bug in Directory</div>

  const BackButton = () => {
    if (path.substring(0, 2) === './' && path.split('/').length === 2) {
      return <></>
    }

    const click = path === '~/' ? returnHome : handleBackButtonClick

    return (
      <div className='directory-item'>
        <button onClick={click} className='directory-button'>
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
        BackButton={path === '~/' ? returnHome : BackButton}
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

export default Directory
