import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Home from './pages/Home/Home'
import TBP from './pages/TBP/TBP'
import ContactMe from './pages/ContactMe/ContactMe'
import NotFound from './pages/NotFound/NotFound'
import NotesHome from './pages/NotesHome/NotesHome'
import GistsPage from './pages/GistsPage/GistsPage'
import DrumKit from './pages/DrumKit/DrumKit'
import Layout from './Layout'
import Composer from './components/.archived/ContactForm/Composer/Composer'
import Synth from './pages/Synth/Synth'
import Piano from './pages/Piano/Piano'

const pingIfNeeded = () => {
  const flag = localStorage.getItem('visited-elijah-dot-com')
  const currentTime = new Date()
  const hourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000)
  let needToPing = true

  if (flag) {
    const flagData = JSON.parse(flag)
    const flagTimestamp = new Date(flagData.timestamp)
    if (flagTimestamp > hourAgo) needToPing = false
  }

  if (needToPing) {
    const userData = gatherUserData()
    axios.post('https://feedback-server.herokuapp.com/log/write', {
      logName: 'users',
      content: userData,
      secret: 69
    })
  }

  localStorage.setItem(
    'visited-elijah-dot-com',
    JSON.stringify({ timestamp: new Date().toISOString() })
  )
}

const gatherUserData = () => {
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

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      userData.latitude = latitude
      userData.longitude = longitude
    })
  }

  return userData
}


const App = () => {
  useEffect(() => {
    pingIfNeeded()
  }, [])

  return (
    <Layout>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/gists' element={<GistsPage />} />
        <Route path='/contact' element={<ContactMe />} />
        <Route path='/notes/*' element={<NotesHome />} />
        <Route path='/drums' element={<DrumKit />} />
        <Route path='/melody' element={<Composer />} />
        <Route path='/synth' element={<Synth />} />
        <Route path='/piano' element={<Piano />} />
        <Route path='/tbp' element={<TBP />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
