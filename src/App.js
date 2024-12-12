import React, { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

const Home = lazy(() => import('./pages/Home/Home'))
const TBP = lazy(() => import('./pages/TBP/TBP'))
const ContactMe = lazy(() => import('./pages/ContactMe/ContactMe'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))
const NotesHome = lazy(() => import('./pages/NotesHome/NotesHome'))
const GistsPage = lazy(() => import('./pages/GistsPage/GistsPage'))
const DrumKit = lazy(() => import('./pages/DrumKit/DrumKit'))
const Layout = lazy(() => import('./Layout'))
const Composer = lazy(() =>
  import('./components/.archived/ContactForm/Composer/Composer')
)
const Synth = lazy(() => import('./pages/Synth/Synth'))
const Piano = lazy(() => import('./pages/Piano/Piano'))
const GameOfLife3D = lazy(() => import('./components/ThreeDee/ThreeDee'))

const pingIfNeeded = async () => {
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
    try {
      const userData = await gatherUserData()
      await axios.post('https://feedback-server.herokuapp.com/log/write', {
        logName: 'users',
        content: userData,
        secret: 69
      })
    } catch (error) {
      console.error('Failed to ping server:', error)
    }
  }

  localStorage.setItem(
    'visited-elijah-dot-com',
    JSON.stringify({ timestamp: new Date().toISOString() })
  )
}

const gatherUserData = async () => {
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
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    }).catch(err => console.warn('Geolocation error:', err))

    if (position) {
      const { latitude, longitude } = position.coords
      userData.latitude = latitude
      userData.longitude = longitude
    }
  }

  return userData
}

const App = () => {
  useEffect(() => {
    pingIfNeeded()
  }, [])

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/gists' element={<GistsPage />} />
          <Route path='/contact' element={<ContactMe />} />
          <Route path='/notes/*' element={<NotesHome />} />
          <Route path='/drums' element={<DrumKit />} />
          <Route path='/melody' element={<Composer />} />
          <Route path='/synth' element={<Synth />} />
          <Route path='/piano' element={<Piano />} />
          <Route path='/tbp' element={<TBP />} />
          <Route path='/3d' element={<GameOfLife3D />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
