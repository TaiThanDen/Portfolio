import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import FloatingSocialIcons from './FloatingSocialIcons';
const Layout = () => {
    return (
        <div>
            <Navbar />
            <FloatingSocialIcons />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
