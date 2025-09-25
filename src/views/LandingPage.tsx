
import HeroBanner from '../components/immutable-components/HeroBanner';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import ContactForm from '@/components/immutable-components/ContactForm';
const LandingPage = () => {
    return (
        <div>
            <HeroBanner />
            <About />
            <Skills />
            <Projects />
            <ContactForm />
        </div>
    );
};

export default LandingPage;