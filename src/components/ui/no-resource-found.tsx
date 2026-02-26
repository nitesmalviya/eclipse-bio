import React from "react";
import Image from "next/image";

interface NoResourceFoundProps {
  icon?: string;
  heading?: string;
  description?: string;
}


const NoResourceFound: React.FC<NoResourceFoundProps> = ({
  icon = "/assets/svgs/search-normal.svg",
  heading = "No resource found",
  description = "We couldn't find any resources matching your criteria. Please try adjusting your filters or search terms.",
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center py-10 px-4 md:px-10">
      <div className="w-full  bg-white rounded-3xl p-10 md:p-14 shadow-[0px_4px_20px_0px_rgba(110,125,128,0.08)] flex flex-col items-center text-center">
        {/* Icon Container */}
        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#F9FBFB] rounded-full flex items-center justify-center mb-8">
          <Image
            src={icon}
            alt="No Results"
            width={48}
            height={48}
            className="opacity-60"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <h2 className="font-manrope font-normal text-2xl md:text-[32px] leading-tight text-[#166470]">
            {heading}
          </h2>
          <p className="font-titillium font-normal text-sm md:text-base leading-6 text-[#525F69] max-w-md mx-auto">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoResourceFound;
