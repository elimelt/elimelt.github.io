import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./Layout";
import Title from "./components/Title/Title";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Info from "./pages/Info/Info";
import Academics from "./pages/Academics/Academics";
import ContactMe from "./pages/ContactMe/ContactMe"
import NotFound from "./pages/NotFound/NotFound";
import './App.css'
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
  <>
    <Title/>
    <Navbar className="navbar"/>
    
      <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/info" element={<Info />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/contact" element={<ContactMe/>} />
          <Route path="*" element={<NotFound />} />
      </Routes>
  </>
    
  );
};

export default App;
