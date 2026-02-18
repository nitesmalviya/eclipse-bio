import React from "react";
import Image from "next/image";
import thumbNailOne from "@/public/assets/images/eMerge_Layer_1.png";
import thumbNailTwo from "@/public/assets/images/Frame87DS.png";

interface ProjectsStats {
  activeCount: number;
  total: number;
}

interface StatsCardProps {
  projectsData?: ProjectsStats;
}

const StatsCard = ({ projectsData }: StatsCardProps) => {
  return (
    <div className="w-full lg:w-[35%] space-y-4">
      {/* Logo */}
      <div className="w-full h-[72px] flex items-center justify-center mt-10 mb-6">
        <Image src={thumbNailOne} alt="thumbnail" />
      </div>

      <p className="text-sm text-[#525F69] mt-6 mb-8">
        Projects overview summary
      </p>

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

      <button className="w-full bg-[#009CA6] text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 transition">
        See eMERGE projects
      </button>
    </div>
  );
};

export default StatsCard;
