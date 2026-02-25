"use client";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col justify-center mb-8 md:mb-12 overflow-hidden min-h-[300px] md:h-[275px] bg p-6 md:p-12">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        autoPlay
        loop
        muted
        playsInline
        style={{ mixBlendMode: "luminosity" }}
      >
        <source
          src="/assets/videos/spherical-molecular-structure-2023-11-27-05-26-12-utc.mp4"
          type="video/mp4"
        />
      </video>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-20">
        <div className="w-48 md:w-64 h-16 md:h-20 relative shrink-0">
          <Image
            src="/assets/images/eMerge_Layer_1.png"
            alt="eMERGE"
            fill
            className="object-contain object-left"
          />
        </div>
        <div className="flex-1 md:border-l border-[#94E0E5] p-6 md:p-12 h-auto w-full">
          <p className="font-manrope text-sm md:text-base text-[#525f69] leading-[150%] text-center md:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, Lorem ipsum dolor sit
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
