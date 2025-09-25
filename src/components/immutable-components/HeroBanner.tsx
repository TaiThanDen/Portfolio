import React from "react";
import VercelCard from "./VercelCard";
import ScratchText from "../reusable-components/ScratchText";

const HeroBanner: React.FC = () => {
    return (
        <div className="relative">
            <section className="relative isolate min-h-screen overflow-hidden">
                {/* BG video */}
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <video
                        className="h-full w-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source
                            src="https://img.bgstatic.com/video/msg/herobanner-1732092714.webm"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
                </div>

                {/* Content Container  */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 pt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center justify-center min-h-screen">
                        {/* Content */}
                        <div className="col-span-1 lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                                bg-gradient-to-r from-gray-500 via-gray-300 to-gray-600 
                                bg-clip-text text-transparent pb-3">
                                Hi I'm Phạm Tấn Tài
                            </h1>
                            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl">
                                <ScratchText mode="sentence" revealMode="progressive" variant="title">
                                    Hello! I'm Phạm Tấn Tài, a passionate web developer with a knack for creating dynamic and user-friendly web applications. With a strong foundation in both front-end and back-end technologies, I enjoy bringing ideas to life through code. When I'm not coding, you can find me exploring the latest tech trends or contributing to open-source projects. Let's connect and build something amazing together!
                                </ScratchText>
                            </p>
                        </div>

                        {/* VercelCard */}
                        <div className="col-span-1 flex">
                            <div className="w-full">
                                <VercelCard />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroBanner;
