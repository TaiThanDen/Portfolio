
import HeroBanner from '../components/immutable-components/HeroBanner';
import About from './About';
import Skills from './Skills';
const LandingPage = () => {
    return (
        <div>
            <HeroBanner />
            <About />
            <Skills />
        </div>
    );
};

export default LandingPage;