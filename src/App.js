import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Title from './components/Title/Title'
import Home from './pages/Home/Home'
import Projects from './pages/Projects/Projects'
import Info from './pages/Info/Info'
import ContactMe from './pages/ContactMe/ContactMe'
import NotFound from './pages/NotFound/NotFound'
import Navbar from './components/Navbar/Navbar'
import Blog from './pages/Blog/Blog'
import EtchASketch from './components/EtchASketch/EtchASketch'
import NewsfeedPage from './pages/NewsfeedPage/NewsfeedPage'
import Everthing from './components/Everything/Everything'
import Tools from './pages/Tools/Tools'
import Composer from './components/Composer/Composer'
import PNGProcessor from './pages/PNGProcessor/PNGProcessor'
import './App.css'

const App = () => {
  pingIfNeeded()

  return (
    <>
      <Title />
      <Navbar className='navbar' />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/info' element={<Info />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<ContactMe />} />
        <Route path='/draw' element={<EtchASketch />} />
        <Route path='/composer' element={<Composer />} />
        <Route path='/newsfeed' element={<NewsfeedPage />} />
        <Route path='/content' element={<Everthing />} />
        <Route path='/tools' element={<Tools />} />
        <Route path='/image-processor' element={<PNGProcessor/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

const pingIfNeeded = () => {
  let flag = localStorage.getItem('visited-elijah-dot-com')
  let currentTime = new Date()
  let hourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000)
  let flagTimestamp
  let needToPing = true
  if (flag) {
    let flagData = JSON.parse(flag)
    flagTimestamp = new Date(flagData.timestamp)
    if (flagTimestamp > hourAgo) needToPing = false
  }

  if (needToPing) {
    let userData = gatherUserData()
    axios.post('https://feedback-server.herokuapp.com/log/write', {
      logName: 'users',
      content: userData,
      secret: 69
    })
  } else {
    // console.log('Flag item exists within the past hour.');
  }

  let newFlagData = {
    timestamp: new Date().toISOString()
  }

  localStorage.setItem('visited-elijah-dot-com', JSON.stringify(newFlagData))
}

function gatherUserData () {
  const userData = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    colorDepth: window.screen.colorDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cookiesEnabled: navigator.cookieEnabled,
    onlineStatus: navigator.onLine,
    platform: navigator.platform,
    plugins: Array.from(navigator.plugins).map(plugin => ({
      name: plugin.name,
      description: plugin.description
    }))
  }

  // Additional information that may be available
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      userData.latitude = latitude
      userData.longitude = longitude
    })
  }

  return userData ? userData : {}
}

export default App
