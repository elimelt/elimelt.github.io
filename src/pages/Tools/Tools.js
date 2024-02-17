import { Link } from 'react-router-dom'
import './Tools.css'

const Tools = () => {
  return (
    <div className='tools-container'>
      <h1 className='tools-title'>Tools</h1>
      <ul className='tools-list'>
        <li className='tools-item'>
          <Link to='/draw' className='tools-link'>
            Drawing
          </Link>
        </li>
        <li className='tools-item'>
          <Link to='/composer' className='tools-link'>
            Sounds
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Tools
