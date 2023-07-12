import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./Layout";
import Title from "./components/Title/Title";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Info from "./pages/Info/Info";
import Academics from "./pages/Blog/Blog";
import ContactMe from "./pages/ContactMe/ContactMe";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Blog from "./pages/Blog/Blog";

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

  
  if (!needToPing) {    
    console.log('Flag item exists within the past hour.');
  } else {
    console.log("should ping server");
  }

  let newFlagData = {
    timestamp: new Date().toISOString()
  };

  localStorage.setItem('visited-elijah-dot-com', JSON.stringify(newFlagData));
}

export default App;
