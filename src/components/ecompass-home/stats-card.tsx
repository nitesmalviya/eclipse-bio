import React from "react";
import Image from "next/image";
import thumbNailOne from "@/public/assets/images/eMerge_Layer_1.png";
import thumbNailTwo from "@/public/assets/images/Frame87DS.png";
import { CloudCog } from "lucide-react";

interface ProjectsStats {
  activeCount: number;
  total: number;
}

interface StatsCardProps {
  projectsData?: ProjectsStats;
}

const StatsCard = ({ projectsData }: StatsCardProps) => {
  console.log("projectsData", projectsData);
  return (
    <div className="w-full lg:w-[400px] flex flex-col">
      {/* Logo */}
      <div className="w-full h-[72px] flex items-center justify-center mt-10 mb-6">
        <Image src={thumbNailOne} alt="thumbnail" style={{ objectFit: 'contain' }} />
      </div>

      <p className="font-titillium font-normal text-sm leading-5 text-[#525F69] m-0 mt-15 mb-8">
        Projects overview summary
      </p>
      <div className="flex flex-col gap-5 mb-8">
        {/* Active Projects */}
        <div className="flex items-center gap-4">
          <div className="w-[60px] h-[60px] rounded-full border bg-[#F7F9FB] flex items-center justify-center">
            <Image src={thumbNailOne} alt="icon" width={30} height={30} />
          </div>

          <div className="flex-1 flex justify-between items-center">
            <span className="font-semibold text-xl text-[#009ca6]">
              Active Projects
            </span>
            <span className="font-semibold text-xl text-[#202024]">
              {projectsData?.activeCount ?? 0}
            </span>
          </div>
        </div>

        {/* Total Projects */}
        <div className="flex items-center gap-4">
          <div className="w-[60px] h-[60px] rounded-full border bg-[#F7F9FB] flex items-center justify-center">
            <Image src={thumbNailTwo} alt="icon" width={30} height={30} />
          </div>

          <div className="flex-1 flex justify-between items-center">
            <span className="font-semibold text-xl text-[#009ca6]">
              Total Projects
            </span>
            <span className="font-semibold text-xl text-[#202024]">
              {projectsData?.total ?? 0}
            </span>
          </div>
        </div>
      </div>
      <button className=" text-white w-full h-[52px] flex items-center justify-center gap-3 py-4 px-6 rounded-lg bg-[#009ca6] border-none cursor-pointer hover:bg-[#008891] transition-colors mt-auto">
        <span className="font-manrope font-bold text-base leading-5 text-[#ffffff]">See eVERSE projects</span>
        <img alt="Send" loading="lazy" width="18" height="18" decoding="async" data-nimg="1" src="/assets/svgs/send.svg"></img>
      </button>
    </div>
  );
};

export default StatsCard;
