import React from "react";

const CardContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="
            flex items-center gap-4 p-5 rounded-xl bg-[#232329] border border-gray-500 shadow-lg w-full sm:w-[300px] md:w-[350px] lg:w-[290px]
            transition duration-200 ease-in-out 
            hover:shadow-2xl hover:scale-105 hover:border-purple-500
            cursor-pointer 
        ">
            {children}
        </div>
    );
};

export default CardContent;