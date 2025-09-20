import { SiGmail } from "react-icons/si";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const FloatingSocialIcons = () => {
    return (
        <div className="fixed bottom-10 right-4 flex flex-col space-y-4 z-50  border border-gray-700 p-3 rounded-full shadow-lg">
            <a
                href="mailto:youremail@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-transform transform hover:scale-110"
            >
                <SiGmail className="w-8 h-8" />
            </a>
            <a
                href="https://github.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
            >
                <FaGithub className="w-8 h-8" />
            </a>
            <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-transform transform hover:scale-110"
            >
                <FaLinkedin className="w-8 h-8" />
            </a>
        </div>
    );
};

export default FloatingSocialIcons;
