import { SiGmail } from "react-icons/si";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BackgroundGradient } from "@/components/ui/shadcn-io/background-gradient";

const FloatingSocialIcons = () => {
    return (
        <div className="fixed bottom-10 right-4 z-50">
            <BackgroundGradient
                containerClassName="p-[2px] rounded-full opacity-80"
                className="rounded-full">
                <div className="flex flex-col space-y-4 p-3 rounded-full bg-[#18181b]/95
                        shadow-lg ring-1 ring-white/10">
                    <a
                        href="mailto:tai25062006z@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-red-500 transition-transform transform hover:scale-110"
                    >
                        <SiGmail className="w-8 h-8" />
                    </a>
                    <a
                        href="https://github.com/TaiThanDen"
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
            </BackgroundGradient>
        </div>
    );
};

export default FloatingSocialIcons;
