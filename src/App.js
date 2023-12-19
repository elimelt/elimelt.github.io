import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
// import Layout from "./Layout";
import Title from "./components/Title/Title";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Info from "./pages/Info/Info";
import ContactMe from "./pages/ContactMe/ContactMe";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Blog from "./pages/Blog/Blog";
import EtchASketch from "./components/EtchASketch/EtchASketch";

const App = () => {
  pingIfNeeded()

  return (
    <>
      <Title />
      <Navbar className="navbar" />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/info" element={<Info />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactMe />} />
        <Route path="/draw" element={<EtchASketch />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const pingIfNeeded = () => {
  let flag = localStorage.getItem('visited-elijah-dot-com');
  let currentTime = new Date();
  let hourAgo = new Date(currentTime.getTime() - (60 * 60 * 1000));
  let flagTimestamp;
  let needToPing = true
  if (flag) {
    let flagData = JSON.parse(flag);
    flagTimestamp = new Date(flagData.timestamp);
    if (flagTimestamp > hourAgo)
      needToPing = false
  }


  if (needToPing) {
    console.log("should ping server");

    let userData = gatherUserData();
    axios.post('https://feedback-server.herokuapp.com/log/write', {
        logName: 'users',
        content: userData,
        secret: 69

    })
  } else {
    console.log('Flag item exists within the past hour.');

  }

  let newFlagData = {
    timestamp: new Date().toISOString()
  };

  localStorage.setItem('visited-elijah-dot-com', JSON.stringify(newFlagData));
}

function gatherUserData() {
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
    plugins: Array.from(navigator.plugins).map((plugin) => ({
      name: plugin.name,
      description: plugin.description,
    })),
  };

  // Additional information that may be available
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      userData.latitude = latitude;
      userData.longitude = longitude;
    });
  }

  return userData ? userData : {};
}


export default App;
