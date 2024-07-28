import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function NavBar() {
  return (
    <div className='navbar'>
      <div className='app-bar'>
        <div className='toolbar'>
          <ButtonLink to='/contact' className='nav-link'>
            Contact
          </ButtonLink>
          <ButtonLink to='/' className='nav-link'>
            Home
          </ButtonLink>
          <ButtonLink to='/gists' className='nav-link'>
            Code Snippets
          </ButtonLink>
          <ButtonLink to='/projects' className='nav-link'>
            Projects
          </ButtonLink>

          <ButtonLink to='/notes' className='nav-link'>
            Notes
          </ButtonLink>

        </div>
      </div>
    </div>
  )
}

const ButtonLink = ({ to, className, children }) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

export default NavBar
