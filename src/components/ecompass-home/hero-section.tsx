const HeroSection = () => {
    return (

        <div className="relative w-full md:max-h-[500px] py-12 md:py-[80px] px-6 md:px-[80px] overflow-hidden bg-[#FFFFFFBF] bg-blend-screen before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[linear-gradient(180deg,rgba(255,255,255,0)_11.46%,rgba(255,255,255,0.6)_76.07%,rgba(255,255,255,0)_102.83%)] before:pointer-events-none before:z-1">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/assets/videos/molecula-.mp4" type="video/mp4" />
            </video>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-20">

                <div className="shrink-0">
                    <span className="font-manrope font-normal text-4xl md:text-[60px] md:leading-[70px] text-[#166470] m-0">
                        Lorem ipsum
                    </span>
                    <br />
                    <span className="font-manrope font-normal text-4xl md:text-[60px] md:leading-[70px] text-[#009CA6] m-0">
                        dolor sit amet
                    </span>
                </div>

                <div className="flex-1 border-t md:border-t-0 md:border-l border-[#94E0E5] pt-8 md:pt-0 md:pl-12 h-auto w-full">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg">
                        A short sentence, something welcoming and descriptive that mirrors the
                        design in the mock. Use this area for a concise product or platform
                        description that orients the user to the dashboard.
                    </p>
                </div>

            </div>
        </div>

    )
}


export default HeroSection;