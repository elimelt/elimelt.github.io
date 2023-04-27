import { Outlet } from "react-router-dom";
import Title from './components/Title/Title.js';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import './Layout.css'

const Layout = () => {
  return (
    <div className='screen-container'>
      <Title className="title"/>
      <Navbar className="navbar"/>
      <Outlet className="page-content"/>
      {/* <Footer className="footer"/> */}
    </div>
  )
};

export default Layout;
