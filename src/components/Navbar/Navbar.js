import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import './Navbar.css'

const NavBar = () => {
  return (
    <AppBar position='static' className='navbar'>
      <Toolbar>
        <Button component={Link} to='/contact' color='inherit' className='nav-link'>
          Contact me
        </Button>
        <Button component={Link} to='/' color='inherit' className='nav-link'>
          Home
        </Button>
        <Button component={Link} to='/projects' color='inherit' className='nav-link'>
          Projects
        </Button>
        <Button component={Link} to='/info' color='inherit' className='nav-link'>
          Info
        </Button>
        <Button component={Link} to='/academics' color='inherit' className='nav-link'>
          Academics
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
