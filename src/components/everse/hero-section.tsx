const HeroSection = () => {
    return (
        <div className="relative w-full min-h-[300px] lg:h-[406px] overflow-hidden">
            <div className="absolute inset-0 z-0">
                <video className="w-full h-full object-cover opacity-50 mix-blend-luminosity">
                    <source src="/assets/videos/signup-video.mp4" type="video/mp4" />
                </video>
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background:
                            "linear-gradient(rgba(255, 255, 255, 0) 11.46%, rgba(255, 255, 255, 0.75) 76.07%, rgba(255, 255, 255, 0) 102.83%), rgba(0, 156, 166, 0.44)",
                        mixBlendMode: "screen",
                    }}
                ></div>
            </div>
            <div className="relative z-20 flex items-center justify-center w-full h-full px-4 md:px-12 lg:px-20 py-10 lg:py-[88px] box-border">
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-[80px] text-center lg:text-left">
                    <div className="flex-shrink-0">
                        <img
                            src="/assets/images/everse-home.png"
                            alt="eVERSE Logo"
                            loading="lazy"
                            width="150"
                            height="163"
                            decoding="async"
                            data-nimg="1"
                            className="object-contain lg:w-[212px] lg:h-[230px]"
                        />
                    </div>
                    <div className="hidden lg:block w-[1px] h-[230px] bg-[#94E0E5]"></div>
                    <div className="max-w-[696px]">
                        <p>A data-generation platform for AI-driven drug discovery.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;