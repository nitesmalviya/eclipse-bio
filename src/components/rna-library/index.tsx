"use client";
import HeroSection from "./hero-section";
import SearchSection from "../ui/search";
import { useCallback, useState } from "react";
import { debounce } from "@/utils/graphql/common-service";
import Pagination from "../ui/pagination";
import { DEFAULT_PAGINATION, GetSequencesResponse, paginationType } from "@/types/sequences";
import { getSequencesAction } from "@/utils/graphql/sequences/action";
import { SORT_ORDER } from "@/utils/constant";
import TableRow from "./table-row";
import NoResourceFound from "../ui/no-resource-found";
import { ArrowUpRight, ChevronsUpDown } from "lucide-react";

interface RnaSequenceProps {
    rnaSequences: GetSequencesResponse;
}

const RNALibrary = ({ rnaSequences }: RnaSequenceProps) => {
    const [pagination, setPagination] = useState<paginationType>(DEFAULT_PAGINATION);
    const [rnaSequenceData, setRnaSequenceData] = useState<GetSequencesResponse>(rnaSequences);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isValidateModalOpen, setIsValidateModalOpen] = useState(false);

    const fetchRnaSequences = async (paginate: paginationType) => {
        try {
            const res = await getSequencesAction({
                page: paginate.page,
                limit: paginate.limit,
                search: paginate.search || null,
                sort: SORT_ORDER.DESC,
                sortBy: "date",
            });
            setRnaSequenceData(res);

        } catch (error) {
            console.error("Failed to fetch RNA sequences:", error);
        } finally {
            setLoading(false);
        }
    }

    // Debounced search function
    const handleDebounce = useCallback(
        debounce((search: string) => {
            const newPagination = {
                ...pagination,
                page: 1,
                search,
            };
            setPagination(newPagination);
            fetchRnaSequences(newPagination);
        }, 500),
        [pagination]
    );

    const handlePageChange = (page: number) => {
        const newPagination = { ...pagination, page };
        setPagination(newPagination);
        fetchRnaSequences(newPagination);
    }



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
                                <SearchSection
                                    onSearchChange={handleDebounce}
                                    placeholder="Search project concept or issued date"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 sm:flex-none">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#009CA6] text-white rounded-lg hover:opacity-90 transition-opacity text-[16px] sm:text-[18px] font-semibold whitespace-nowrap">
                                        <img className="w-[24px] h-[24px] hidden lg:block" alt="" src="/assets/svgs/document-upload-white.svg" />
                                        Add sequence
                                        <ArrowUpRight className="w-[20px] h-[20px] lg:hidden" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Table Section */}
                        <div className="w-full bg-white overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-[#E5E5E5]">
                                        <th className="text-left py-4 px-4 text-[16px] font-semibold text-[#95A3AB]">
                                            <div className="flex justify-center items-center gap-1">
                                                <span >
                                                    Sequence ID
                                                </span>
                                                <span className="ml-2">
                                                    <ChevronsUpDown className="w-[14px] h-[14px]" />
                                                </span>
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-4 text-[16px] font-semibold text-[#95A3AB]">
                                            <div
                                                className="flex justify-center items-center gap-1"
                                            >
                                                <span>
                                                    Source
                                                </span>
                                                <span className="ml-2">
                                                    <ChevronsUpDown className="w-[14px] h-[14px]" />
                                                </span>
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-4 text-[16px] font-semibold text-[#95A3AB]">
                                            <div className="flex justify-center items-center gap-1">
                                                <span>
                                                    Status
                                                </span>
                                                <span className="ml-2">
                                                    <ChevronsUpDown className="w-[14px] h-[14px]" />
                                                </span>
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-4 text-[16px] font-semibold text-[#95A3AB]">
                                            <div className="flex justify-center items-center gap-1">
                                                <span>
                                                    RNA Type
                                                </span>
                                                <span className="ml-2">
                                                    <ChevronsUpDown className="w-[14px] h-[14px]" />
                                                </span>
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-4 text-[16px] font-semibold text-[#95A3AB]">
                                            <div
                                                className="flex justify-center items-center gap-1">
                                                <span className="ml-2">
                                                    Validations
                                                </span>
                                                <span className="ml-2">
                                                    <ChevronsUpDown className="w-[14px] h-[14px]" />
                                                </span>
                                            </div>
                                        </th>
                                        <th className="text-left py-4 px-4 text-[16px] font-semibold text-[#95A3AB]">
                                            <div className="flex justify-center items-center gap-1">
                                                <span >
                                                    Created date
                                                </span>
                                                <span className="ml-2">
                                                    <ChevronsUpDown className="w-[14px] h-[14px]" />
                                                </span>
                                            </div>
                                        </th>
                                        <th className="w-10 px-6 py-4 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        rnaSequenceData.data.length > 0 ? (
                                            rnaSequenceData.data.map((rnaSequenceItem, index) => (
                                                <TableRow
                                                    key={rnaSequenceItem.id}
                                                    index={index}
                                                    rnaSequenceItem={rnaSequenceItem}
                                                />
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="text-center py-5 text-gray-500">
                                                    <NoResourceFound />
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Component */}
                        <div className="mt-4 border-t border-gray-100">
                            <Pagination
                                currentPage={rnaSequenceData.page}
                                totalItems={rnaSequenceData.total}
                                itemsPerPage={rnaSequenceData.limit}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RNALibrary;