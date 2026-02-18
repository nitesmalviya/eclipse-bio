"use client"
import { PRIVATE_PATH } from '@/src/utils/constant';
import Breadcrumb from '../../ui/breadcrumb/Breadcrumb';
import HeroSection from '../hero-section'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image';
import ComparisonTableSection from './comparison-table-section';
import { debounce } from '@/src/utils/common-service';
import { getEmergeComparisonsAction } from '@/src/utils/graphql/emerge/action';
import { useState, useMemo, useEffect } from "react";
import { Comparisons, CreateComparisonInput } from "@/src/types/comparison-list";
import { createComparison } from "@/src/store/actions/comparison-action";
import { toast } from "sonner";
import SearchSection from './search-section';

interface EMergeComparisonListComponentProps {
    comparisons: Comparisons[] | null;
    initialSearch?: string;
}

const ComparisonLists = ({ comparisons, initialSearch = "", }: EMergeComparisonListComponentProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [comparisonList, setComparisonList] = useState<Comparisons[] | null>(
        comparisons,
    );
    // Update comparisonList when comparisons prop changes (from server)
    useEffect(() => {
        setComparisonList(comparisons);
    }, [comparisons]);

    // Sync searchQuery with initialSearch (e.g. on back/forward navigation)
    useEffect(() => {
        setSearchQuery(initialSearch);
    }, [initialSearch]);

    // Debounced search function
    const debouncedSearch = useMemo(
        () =>
            debounce(async (query: string) => {
                setLoading(true);
                try {
                    const res = await getEmergeComparisonsAction({
                        variables: { filter: { search: query } },
                    });
                    setComparisonList(res?.comparisons?.data || null);
                } finally {
                    setLoading(false);
                }
            }, 500),
        []
    );

    // Handle search input changes
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        debouncedSearch(query);
    };

    // Handle row click
    const handleRowClick = (id: string) => {
        router.push(`${PRIVATE_PATH.EMERGE_COMPARISON_LISTS}/${id}`);
    };

    return (
        <div className="flex w-full min-h-screen bg-white font-titillium">
            <div className="w-full">
                {/* Breadcrumbs */}
                <div className="px-4 md:px-12  py-4">
                    <Breadcrumb
                        items={[
                            { label: "eMERGE Home", href: PRIVATE_PATH.EMERGE_HOME },
                            { label: "eMERGE Comparison Lists", isActive: true },
                        ]}
                    />
                </div>
                <HeroSection />
                <div className="px-4 md:px-12 lg:px-20">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                        <h2 className="font-titillium font-semibold text-2xl md:text-[28px] text-[#166470] m-0 leading-[120%]">
                            Comparison lists
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full lg:w-auto">
                            <div className="flex-1 lg:flex-none">
                                <SearchSection
                                    searchQuery={searchQuery}
                                    handleSearch={handleSearch}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 sm:flex-none">
                                    <button
                                        className="h-12 bg-[#009ca6] text-white rounded-lg px-6 border-none flex items-center justify-center sm:justify-start gap-2 font-manrope font-bold text-base cursor-pointer hover:bg-[#007d85] transition-colors w-full sm:w-auto"

                                    >
                                        <Image src="/assets/svgs/add-circle.svg" alt="+" width={16} height={16} />
                                        New comparison
                                    </button>
                                </div>
                                <button className="h-12 w-12 shrink-0 bg-[#009ca6] rounded-lg border-none flex items-center justify-center cursor-pointer hover:bg-[#007d85] transition-colors">
                                    <Image
                                        src="/assets/svgs/setting-4.svg"
                                        alt="Filter"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={"relative"}>
                        <ComparisonTableSection
                            comparisons={comparisonList}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            handleRowClick={handleRowClick}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComparisonLists;
