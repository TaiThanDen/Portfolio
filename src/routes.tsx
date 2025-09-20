import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import About from "./views/About";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="about" element={<About />} />
            </Route>
        </Routes>
    );
};
export default AppRoutes;