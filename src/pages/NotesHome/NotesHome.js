import './NotesHome.css'
import GithubRepo from '../../components/GithubRepo/GithubRepo'

const NotesHome = () => {

  return (
    <div className='notes-container'>
      <GithubRepo repoName={"notes"} repoOwner={"elimelt"}/>
    </div>
  )
}

export default NotesHome
