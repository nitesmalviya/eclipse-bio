const ProjectCards = () => {
    return (
        <div className="w-full px-4 md:px-12 lg:px-20 py-8 md:py-10">
            <div className=" w-full">
                <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 lg:mb-[40px]">
                    <h2 className="text-3xl lg:text-[40px]">Projects</h2>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 sm:flex-initial gap-[16px] undefined">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 w-[24px] h-[24px] text-[#98B4BC]" aria-hidden="true"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle>
                            </svg>
                            <input data-slot="input" className="file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 min-w-0 bg-transparent px-3 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-full sm:w-[280px] pl-10 pr-4 py-2.5 sm:py-3 border border-[#E5E5E5] rounded-lg text-[14px] sm:text-[15px] text-[#525F69] placeholder:text-[#98B4BC] placeholder:text-[16px] sm:placeholder:text-[16px] focus:outline-none focus:border-[#009CA6] focus:ring-1 focus:ring-[#009CA6] h-auto" placeholder="Search..." type="text" value="" />
                        </div>
                        <button className="flex items-center justify-center gap-2 text-white bg-[#009CA6] w-full sm:w-[138px] h-[52px] rounded-[8px] hover:bg-[#008B94] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-settings2 lucide-settings-2" aria-hidden="true">
                                <path d="M14 17H5"></path>
                                <path d="M19 7h-9"></path>
                                <circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle>
                            </svg>
                            <span >Filter</span>
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[48px]">
                        <div className="relative w-full h-[417px] rounded-[18px] p-[2px] bg-gradient-to-r from-[#f2f5f5] via-[#e7f8f8] to-[#f2f5f5] bg-[length:200%_200%] animate-borderMove">
                            <div className="relative flex flex-col w-full h-full rounded-[16px] overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-[130px] w-full p-[32px] flex items-center justify-center">
                                    <div className="relative w-full h-full">
                                        <img alt="Molecular Art" className="object-contain h-full mx-auto"
                                            src="/assets/images/card-img-1.png"
                                        />
                                    </div>
                                </div>
                                <div className="h-[226px] p-[24px] flex flex-col">
                                    <h3 className="mb-4" >Serum and plasma samples</h3>
                                    <div className="flex flex-col gap-3 mt-auto">
                                        <div className="flex items-start gap-2">
                                            <img alt="Sample Type" width="20" height="20" className="mt-0.5 object-contain"
                                                src="/assets/images/note.png" />
                                            <div>
                                                <span className="block text-sm font-semibold text-[#009CA6]">Sample type:</span>
                                                <span className="text-sm text-[#525F69]">Serum and plasma samples</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <img alt="Assay" width="20" height="20" className="mt-0.5 object-contain"
                                                src="/assets/images/notbook.png" />
                                            <div>
                                                <span className="block text-sm font-semibold text-[#009CA6]">Assay:</span>
                                                <span className="text-sm text-[#525F69]">ELISA Assay</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[53px] px-[24px] pb-[24px] flex items-center justify-start mt-auto relative z-10">
                                    <div className="w-[77px] h-[26px] flex items-center justify-center rounded-[100px] bg-[#e9c110]">
                                        <span className="text-white text-xs font-bold tracking-wider">OWNED</span></div>
                                </div>
                                <div className="absolute bottom-0 right-0 w-[60px] h-[60px] bg-white rounded-tl-[16px] flex items-center justify-center z-20">
                                    <a className="flex items-center justify-center shadow-sm" href="/everse/dataset/42b134e8-a697-4fa7-b367-6917207e5500">
                                        <img alt="Go" loading="lazy" width="20" height="20" decoding="async" data-nimg="1"
                                            src="/assets/images/arrow.png" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full h-[417px] rounded-[18px] p-[2px] bg-gradient-to-r from-[#f2f5f5] via-[#e7f8f8] to-[#f2f5f5] bg-[length:200%_200%] animate-borderMove">
                            <div className="relative flex flex-col w-full h-full rounded-[16px] overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-[130px] w-full p-[32px] flex items-center justify-center">
                                    <div className="relative w-full h-full text-center">
                                        <img alt="Molecular Art" loading="lazy" decoding="async"
                                            data-nimg="fill" className="object-contain h-full mx-auto" sizes="100vw"
                                            src="/assets/images/card-img-2.png" />
                                    </div>
                                </div>
                                <div className="h-[226px] p-[24px] flex flex-col">
                                    <h3 className="mb-4">Cross-linked chromatin</h3>
                                    <div className="flex flex-col gap-3 mt-auto">
                                        <div className="flex items-start gap-2">
                                            <img alt="Sample Type" width="20" height="20" decoding="async"
                                                data-nimg="1" className="mt-0.5 object-contain "
                                                src="/assets/images/note.png "
                                            /><div>
                                                <span className="block text-sm font-semibold text-[#009CA6]">Sample type:</span>
                                                <span className="text-sm text-[#525F69]">Cross-linked chromatin</span></div></div>
                                        <div className="flex items-start gap-2">
                                            <img alt="Assay" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" className="mt-0.5 object-contain"
                                                src="/assets/images/notbook.png" />
                                            <div><span className="block text-sm font-semibold text-[#009CA6]">Assay:</span>
                                                <span className="text-sm text-[#525F69]">ChIP-Seq Assay</span></div></div></div></div>
                                <div className="h-[53px] px-[24px] pb-[24px] flex items-center justify-start mt-auto relative z-10">
                                    <div className="w-[77px] h-[26px] flex items-center justify-center rounded-[100px] bg-[#e9c110]">
                                        <span className="text-white text-xs font-bold tracking-wider">OWNED</span></div></div>
                                <div className="absolute bottom-0 right-0 w-[60px] h-[60px] bg-white rounded-tl-[16px] flex items-center 
                                                                        justify-center z-20">
                                    <a className="flex items-center justify-center shadow-sm"
                                    >
                                        <img alt="Go" loading="lazy" width="20" height="20" src="/assets/images/arrow.png" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full h-[417px] rounded-[18px] p-[2px] bg-gradient-to-r from-[#f2f5f5] via-[#e7f8f8] to-[#f2f5f5] bg-[length:200%_200%] animate-borderMove">
                            <div className="relative flex flex-col w-full h-full rounded-[16px] overflow-hidden hover:shadow-xl transition-shadow"
                            ><div className="h-[130px] w-full p-[32px] flex items-center justify-center">
                                    <div className="relative w-full h-full text-center">
                                        <img alt="Molecular Art" loading="lazy" decoding="async" data-nimg="fill"
                                            className="object-contain h-full mx-auto" sizes="100vw"
                                            src="assets/images/card-img-3.png"
                                        />
                                    </div>
                                </div>
                                <div className="h-[226px] p-[24px] flex flex-col">
                                    <h3 className="mb-4">Peripheral blood mononuclear cells</h3>
                                    <div className="flex flex-col gap-3 mt-auto"><div className="flex items-start gap-2">
                                        <img alt="Sample Type" loading="lazy"
                                            width="20" height="20" decoding="async" data-nimg="1"
                                            className="mt-0.5 object-contain"
                                            src="assets/images/note.png" />
                                        <div>
                                            <span className="block text-sm font-semibold text-[#009CA6]">Sample type:</span>
                                            <span className="text-sm text-[#525F69]">Peripheral blood mononuclear cells</span></div>
                                    </div>
                                        <div className="flex items-start gap-2">
                                            <img alt="Assay" loading="lazy" width="20" height="20"
                                                className="mt-0.5 object-contain"
                                                src="assets/images/notbook.png" /><div>
                                                <span className="block text-sm font-semibold text-[#009CA6]">Assay:</span>
                                                <span className="text-sm text-[#525F69]">Flow Cytometry Assay</span></div></div></div></div>
                                <div className="h-[53px] px-[24px] pb-[24px] flex items-center justify-start mt-auto relative z-10">
                                    <a className="w-[77px] h-[26px] flex items-center justify-center rounded-[100px] bg-[#009CA6] text-white text-xs font-bold tracking-wider hover:opacity-90 transition" href="/everse/dataset/c8a2d9f2-2fd3-47df-b705-6681b5b6b6e6">BUY</a>
                                </div>
                                <div className="absolute bottom-0 right-0 w-[60px] h-[60px] bg-white rounded-tl-[16px] flex items-center justify-center z-20">
                                    <a className="flex items-center justify-center shadow-sm" href=""
                                    >
                                        <img alt="Go" loading="lazy" width="20" height="20" decoding="async" data-nimg="1"
                                            src="/assets/images/arrow.png" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full h-[417px] rounded-[18px] p-[2px] bg-gradient-to-r from-[#f2f5f5] via-[#e7f8f8] to-[#f2f5f5] bg-[length:200%_200%] animate-borderMove">
                            <div className="relative flex flex-col w-full h-full rounded-[16px] overflow-hidden hover:shadow-xl transition-shadow"
                            ><div className="h-[130px] w-full p-[32px] flex items-center justify-center">
                                    <div className="relative w-full h-full">
                                        <img alt="Molecular Art"
                                            className="object-contain h-full mx-auto"
                                            sizes="100vw"
                                            src="/assets/images/card-img-4.png"
                                        /></div>
                                </div>
                                <div
                                    className="h-[226px] p-[24px] flex flex-col">
                                    <h3 className="mb-4">Total RNA</h3>
                                    <div className="flex flex-col gap-3 mt-auto">
                                        <div className="flex items-start gap-2">
                                            <img alt="Sample Type" loading="lazy" width="20" height="20" className="mt-0.5 object-contain"
                                                src="/assets/images/note.png"
                                            /><div>
                                                <span className="block text-sm font-semibold text-[#009CA6]">Sample type:</span>
                                                <span className="text-sm text-[#525F69]">Total RNA</span></div></div>
                                        <div className="flex items-start gap-2">
                                            <img alt="Assay" loading="lazy" width="20" height="20"
                                                className="mt-0.5 object-contain" />
                                            <div>
                                                <span className="block text-sm font-semibold text-[#009CA6]">Assay:</span>
                                                <span className="text-sm text-[#525F69]">RNA-Seq Assay</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[53px] px-[24px] pb-[24px] flex items-center justify-start mt-auto relative z-10">
                                    <div className="w-[77px] h-[26px] flex items-center justify-center rounded-[100px] bg-[#e9c110]">
                                        <span className="text-white text-xs font-bold tracking-wider">OWNED</span></div>
                                </div>
                                <div className="absolute bottom-0 right-0 w-[60px] h-[60px] bg-white rounded-tl-[16px] flex items-center justify-center z-20">
                                    <a className="flex items-center justify-center shadow-sm"
                                    >
                                        <img alt="Go" loading="lazy" width="20" height="20"
                                            src="/assets/images/arrow.png" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full h-[417px] rounded-[18px] p-[2px] bg-gradient-to-r from-[#f2f5f5] via-[#e7f8f8] to-[#f2f5f5] bg-[length:200%_200%] animate-borderMove">
                            <div className="relative flex flex-col w-full h-full rounded-[16px] overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="h-[130px] w-full p-[32px] flex items-center justify-center">
                                    <div className="relative w-full h-full">
                                        <img alt="Molecular Art" className="object-contain h-full mx-auto"
                                            src="/assets/images/card-img-1.png" />

                                    </div>
                                </div>
                                <div className="h-[226px] p-[24px] flex flex-col">
                                    <h3 className="mb-4">cDNA samples</h3>
                                    <div className="flex flex-col gap-3 mt-auto">
                                        <div className="flex items-start gap-2">
                                            <img alt="Sample Type" width="20" height="20" className="mt-0.5 object-contain"
                                                src="/assets/images/note.png" />
                                            <div>
                                                <span className="block text-sm font-semibold text-[#009CA6]">Sample type:</span>
                                                <span className="text-sm text-[#525F69]">cDNA samples</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <img alt="Assay" width="20" height="20" className="mt-0.5 object-contain"
                                                src="/assets/images/notbook.png" />
                                            <div>
                                                <span className="block text-sm font-semibold text-[#009CA6]">Assay:</span>
                                                <span className="text-sm text-[#525F69]">qPCR Assay</span></div>
                                        </div></div>
                                </div><div className="h-[53px] px-[24px] pb-[24px] flex items-center justify-start mt-auto relative z-10">
                                    <a className="w-[77px] h-[26px] flex items-center justify-center rounded-[100px] bg-[#009CA6] text-white text-xs font-bold tracking-wider hover:opacity-90 transition" href="/everse/dataset/4a3da017-00e1-4cb2-aeb3-6482651ff305">BUY</a>
                                </div>
                                <div className="absolute bottom-0 right-0 w-[60px] h-[60px] bg-white rounded-tl-[16px] flex items-center justify-center z-20">
                                    <a className="flex items-center justify-center shadow-sm" href="/everse/dataset/4a3da017-00e1-4cb2-aeb3-6482651ff305">
                                        <img alt="Go" loading="lazy" width="20" height="20" decoding="async" data-nimg="1"
                                            src="/assets/images/arrow.png" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProjectCards;