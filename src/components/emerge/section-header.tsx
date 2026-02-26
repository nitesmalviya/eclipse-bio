"use client";
import Image from "next/image";

interface SectionHeaderProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

const SectionHeader = ({
  title,
  buttonText,
  onButtonClick,
}: SectionHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#166470] font-titillium">
        {title}
      </h2>
      <button
        onClick={onButtonClick}
        className="flex items-center gap-3 px-6 py-3 bg-[#009CA6] text-white rounded-lg hover:bg-[#008891] transition-colors w-full md:w-auto justify-center"
      >
        <span className="font-bold text-base md:text-lg">{buttonText}</span>
        <Image src="/assets/svgs/send.svg" alt="Send" width={20} height={20} />
      </button>
    </div>
  );
};

export default SectionHeader;
