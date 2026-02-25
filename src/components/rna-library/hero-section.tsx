"use client";

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

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-[32px] mb-6">
         
           <h2 className="text-[32px] sm:text-[40px]  text-[#166470]">RNA Library</h2>
         
        <div className="lg:flex-1 lg:ml-6 border-l-4 border-[#009CA6] pl-4 py-1">
          <p className="text-[14px] sm:text-[16px] text-[#525F69]">
            Create, organize, and manage your RNA sequences in one place. Build new sequences from fragments (UTRs, CDS, and other elements) or upload complete sequences ready for analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
