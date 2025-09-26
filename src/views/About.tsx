import ScratchText from "../components/reusable-components/ScratchText";
import Spline from '@splinetool/react-spline';

export default function About() {
    return (
        <div className="relative w-full pt-10 min-h-screen overflow-hidden">
            {/* Lớp nền tối phía sau */}
            <div className="absolute inset-0 bg-[#18181b] -z-10" />
            {/* <FlickeringGrid
                className="absolute inset-0 z-0"
                color="#a78bfa"
                maxOpacity={0.5}
                squareSize={6}
                gridGap={8}
            /> */}
            <div className="container max-w-7xl mx-auto py-6 px-2 md:py-10 md:px-0 relative z-10">
                <div
                    className="
                    grid grid-cols-1 md:grid-cols-5 
                    rounded-3xl md:mx-6
                    border-2 border-purple-700
                    shadow-[0_0_40px_0_rgba(139,92,246,0.6)]
                    ring-2 ring-purple-500/40
                    bg-[#18181c]
                "
                >
                    {/* Content */}
                    <div className="md:col-span-3 p-4 md:pl-12 rounded-lg shadow">
                        <h3 className="font-bold pt-4 md:pt-6 text-2xl md:text-3xl ">
                            About Me
                        </h3>
                        <div className="gap-4 pt-4">
                            <p className="leading-relaxed text-base md:text-lg">
                                <ScratchText mode="sentence" revealMode="progressive" variant="content">
                                    As an FPT College student, although I have just graduated, I already built and delivered real websites for clients. These projects not only helped me gain practical experience but also improved my ability to understand client needs and turn ideas into functional solutions. I am confident that this early exposure gives me a strong foundation to grow further in the field of web development.
                                </ScratchText>
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div className="col-span-1">
                                <h3 className="font-bold text-lg md:text-xl mb-2">
                                    Personal Information
                                </h3>
                                <ul className="list-disc mb-5 gap-2 list-inside space-y-1 text-sm md:text-base">
                                    <li><ScratchText mode="word" revealMode="all" variant="content">Age: 19</ScratchText></li>
                                    <li><ScratchText mode="word" revealMode="all" variant="content">Phone: 0961967006</ScratchText></li>
                                    <li><ScratchText mode="word" revealMode="all" variant="content">Occupation: Web Developer</ScratchText></li>
                                    <li><ScratchText mode="word" revealMode="all" variant="content">Email: tai25062006z@gmail.com</ScratchText></li>
                                    <li><ScratchText mode="word" revealMode="all" variant="content">GitHub: https://github.com/TaiThanDen</ScratchText></li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                            <div className="col-span-1 ">
                                <div className="flex mb-2 text-4xl">
                                    <p className="">
                                        5
                                    </p>
                                    <span className=" text-purple-600 ">
                                        +
                                    </span>
                                </div>
                                <p className="leading-relaxed font-semibold ">
                                    Project Finished
                                </p>
                            </div>
                            <div className="col-span-1 ">
                                <div className="flex mb-2 text-4xl">
                                    <p className="">
                                        2
                                    </p>
                                    <span className=" text-purple-600 ">
                                        +
                                    </span>
                                </div>
                                <p className="leading-relaxed font-semibold ">
                                    Months Of Experience
                                </p>
                            </div>
                            <div className="col-span-1 ">
                                <div className="flex mb-2 text-4xl">
                                    <p className=" ">
                                        3.64
                                    </p>
                                    <span className=" text-purple-600 ">
                                        /4.00
                                    </span>
                                </div>
                                <p className="leading-relaxed font-semibold ">
                                    GPA
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Tab Sidebar */}
                    <div className="md:col-span-2 p-4 border-t md:border-t-0 md:border-l border-purple-900 ">
                        <div className=" col-span-1 h-full w-full">
                            {/* <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/c1dfa8fd-9987-4fc4-9de3-2c99666da297-profile_image-300x300.png" alt="Avatar" className="rounded-lg shadow" /> */}
                            {/* <Lanyard
                                cardImage={CardFont}            // bắt buộc
                                strapImage={strapPng}        // tùy chọn
                                // hookImage={hook}            // tùy chọn
                                width={1.6}                    // mặc định 1.6
                                height={2.25}                  // mặc định 2.25
                                mass={0.1}                     // giảm nếu muốn đỡ rung (vd 0.25)
                            /> */}
                            <Spline scene="https://prod.spline.design/0JVnLC2NnGSjgZts/scene.splinecode" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
