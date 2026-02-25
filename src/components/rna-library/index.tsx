"use client";

import Image from "next/image";
import HeroSection from "./hero-section";
import SearchSection from "./search-section";
import { useMemo, useState } from "react";
import { debounce } from "@/src/utils/graphql/common-service";
import SequencesTable from "./sequences-table";
import { Sequences } from "@/src/types/sequences";

interface RnaSequenceProps {
    rnaSequences: Sequences[] | null;
}

const RNALibrary = ({ rnaSequences }: RnaSequenceProps) => {
    console.log(rnaSequences, "rnaSequences list")
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Handle search input changes
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        debouncedSearch(query);
    };

    // Debounced search function
    const debouncedSearch = useMemo(
        () =>
            debounce(async (query: string) => {
                setLoading(true);

            }, 500),
        []
    );

    return (
        <div className="flex w-full min-h-screen bg-white font-titillium">
            <div className="w-full">
                <HeroSection />
                <div className="px-4 md:px-12 lg:px-20">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                        <h2 className="text-[24px] sm:text-[40px] font-semibold text-[#166470]">
                            Sequences
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full lg:w-auto">
                            {/* Search */}
                            <div className="flex-1 lg:flex-none">
                                <SearchSection searchQuery={searchQuery}
                                    handleSearch={handleSearch} />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 sm:flex-none">
                                    <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#009CA6] text-white rounded-lg hover:opacity-90 transition-opacity text-[16px] sm:text-[18px] font-semibold whitespace-nowrap">
                                        <img className="w-[24px] h-[24px] hidden lg:block" alt="" src="/assets/svgs/document-upload-white.svg" />
                                        Add sequence
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right w-[20px] h-[20px] lg:hidden" aria-hidden="true">
                                            <path d="M7 7h10v10"></path>
                                            <path d="M7 17 17 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Table Section */}
                        <SequencesTable rnaSequences={rnaSequences} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RNALibrary;