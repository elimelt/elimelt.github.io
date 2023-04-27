import { Outlet } from "react-router-dom";
import Title from './components/Title/Title.js';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';

const Layout = () => {
  return (
    <>
        <Title/>
        <Navbar/>
        <Outlet />
        <Footer />
    </>
  )
};

export default Layout;
