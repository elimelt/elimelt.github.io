import { useState } from 'react'
import './Everything.css'
import GithubRepo from '../../GithubRepo/GithubRepo'
import Directory from '../../Directory/Directory'

const Everything = ({ initialRepo, initialPath }) => {
  const repos = ['notes', 'blog']
  const [repo, setRepo] = useState(initialRepo || '')

  const back = () => {
    setRepo('')
  }

  const repoList = (
    <div className='everything-container'>
      <div className='repos'>
        <div className='dir-heading'>
          <span className='dir-item'>~/</span>
        </div>
        <Directory
          path={'./' + repo}
          files={[]}
          directories={repos}
          handleDirectoryClick={setRepo}
          handleFileClick={() => {}}
          handleBackButtonClick={back}
        />
      </div>
    </div>
  )

  if (repo === '') return repoList

  return (
    <div className='everything-container'>
      <GithubRepo
        repoName={repo}
        repoOwner={'elimelt'}
        basePath={'~/'}
        returnHome={back}
      />
    </div>
  )
}

export default Everything
