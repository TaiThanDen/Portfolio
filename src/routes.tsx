import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import About from "./views/About";
import Skills from "./views/Skills";
import ContactForm from "./components/immutable-components/ContactForm";
import Projects from "./views/Projects";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
                <Route path="skills" element={<Skills />} />
                <Route path="projects" element={<Projects />} />
                <Route path="contact" element={<ContactForm />} />
            </Route>
        </Routes>
    );
};
export default AppRoutes;