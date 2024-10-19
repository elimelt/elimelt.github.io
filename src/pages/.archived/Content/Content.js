import Everything from '../../../components/Everything/Everything'
import './Content.css'

const Content = () => {
  const url = window.location.href

  // host:port/content/{repo}/{filePath}
  //[repo, file, path, ...]
  const pathArray = url.split('/').slice(4)
  let initialRepo = pathArray[0]

  let initialPath = (pathArray.length > 1)
    ? pathArray.slice(1).join('/')
    : ''


  return (
    <div className='content-container'>
      <Everything initialRepo={initialRepo} initialPath={initialPath} />
    </div>
  )
}

export default Content
