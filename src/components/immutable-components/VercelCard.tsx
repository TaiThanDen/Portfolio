import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import cardImg from "../../assets/herobanner/christmas-removebg-preview.png";
import cafe from "../../assets/herobanner/aecafe_1_1_-removebg-preview.png";
const VercelCard = () => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            VanillaTilt.init(cardRef.current, {
                max: 25,
                speed: 400,
                glare: true,
                "max-glare": 0.5,
            });
        }
    }, []);

    return (
        <div
            ref={cardRef}
            className="group w-full sm:w-[300px] md:w-[350px] lg:w-[400px] mx-auto relative w-96 h-[520px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
        >
            {/* Holographic animated background */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#ff00cc,#3333ff,#00ffcc,#ffcc00,#ff3300,#ff00cc)] animate-spin-slow blur-2xl opacity-60 pointer-events-none" />

            {/* Overlay mờ */}
            <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

            {/* Holographic overlay on hover */}
            <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="w-full h-full bg-[conic-gradient(from_180deg,#00ffe7,#ff00cc,#fff200,#00ffe7)] animate-spin-fast mix-blend-lighten blur-lg opacity-70" />
            </div>

            {/* Nội dung */}
            <div className="relative z-30 flex flex-col items-center justify-between h-full p-6 text-white">
                <img
                    src={cardImg}
                    alt="avatar"
                    className="absolute inset-0 w-full h-full object-contain z-0"
                />
                <div className="text-center mt-2">
                    <h2 className="text-xl font-bold drop-shadow">Phạm Tấn Tài</h2>
                    <p className="text-sm text-gray-200">Web Developer</p>
                </div>
                <div className="w-full grid grid-cols-6 bg-white/20 rounded-lg relative px-4 py-2 items-center mt-auto">
                    {/* Avatar */}
                    <img
                        src={cafe}
                        alt="avatar"
                        className="w-10 h-10 object-cover rounded-full col-span-1 "
                    />

                    {/* Info */}
                    <div className="flex flex-col items-start justify-center flex-1 mx-2 col-span-3">
                        <p className="text-sm text-gray-200">@phamtantai</p>
                        <p className="text-xs text-green-400">online</p>
                    </div>

                    {/* Button */}
                    <button className="px-3 py-2 h-10 text-sm bg-white/20 rounded-lg hover:bg-white/30 transition col-span-2 z-10 ">
                        Contact Me
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VercelCard;
