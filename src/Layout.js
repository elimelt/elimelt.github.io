import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const LayoutContainer = styled.div`
  font-family: 'Courier New', Courier, monospace;
  line-height: 1.5;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`

const Header = styled.header`
  padding: 10px;
  margin-bottom: 20px;
`

const Title = styled.h1`
  font-size: 40px;
  margin: 0;
  text-align: center;
`

const ExternalLinks = styled.div`
  text-align: center;
  margin-top: 10px;
`

const ExternalLink = styled.a`
  margin: 0 10px;
  font-size: 30px;
  font-weight: bold;
`

const Nav = styled.nav`
  padding: 10px;
  margin-bottom: 20px;
`

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const NavItem = styled.li`
  margin: 5px 15px;
`

const NavLink = styled(Link)`
  font-weight: bold;
  font-size: 20px;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`

const Main = styled.main`
  padding: 20px;
`

const funPaths = ['/drums', '/melody', '/synth', '/piano', '/tbp', '/3d']

export const funPath = () => {
  let path = ''
  let currentPath = window.location.pathname
  do {
    const randomIndex = Math.floor(Math.random() * funPaths.length)
    path = funPaths[randomIndex]
    console.log(path)
  } while (path === currentPath)
  console.log(path)
  return path
}

const Layout = ({ children }) => {
  const navigate = useNavigate()

  const handleFunClick = e => {
    e.preventDefault()
    let currentPath = window.location.pathname
    let path

    do {
      const randomIndex = Math.floor(Math.random() * funPaths.length)
      path = funPaths[randomIndex]
    } while (path === currentPath)

    navigate(path)
  }

  return (
    <LayoutContainer>
      <Header>
        <Title>
          elimelt.<i>com</i>
        </Title>
        <ExternalLinks>
          <ExternalLink
            href='https://linkedin.com/in/elimelt'
            target='_blank'
            rel='noreferrer'
          >
            LinkedIn
          </ExternalLink>
          <ExternalLink
            href='https://github.com/elimelt'
            target='_blank'
            rel='noreferrer'
          >
            GitHub
          </ExternalLink>
        </ExternalLinks>
      </Header>
      <Nav>
        <NavList>
          <NavItem>
            <NavLink to='/'>Home</NavLink>
          </NavItem>
          {/* <NavItem><NavLink to="/contact">Contact</NavLink></NavItem> */}
          <NavItem>
            <NavLink to='/gists'>Code Snippets</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='/notes'>Notes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='#' onClick={handleFunClick}>
              Fun
            </NavLink>
          </NavItem>
        </NavList>
      </Nav>
      <Main>{children}</Main>
    </LayoutContainer>
  )
}

export default Layout
