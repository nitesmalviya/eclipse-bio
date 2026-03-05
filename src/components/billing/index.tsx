"use client";
import { useRouter } from "next/navigation";
import Breadcrumb from "../ui/breadcrumb/Breadcrumb"
import { PRIVATE_PATH, SORT_ORDER } from "@/utils/constant";
import { formatDateUTC } from "@/utils/graphql/common-service";
import { ChevronsUpDown } from "lucide-react";
import TableRow from "./table-row";
import NoResourceFound from "../ui/no-resource-found";
import SearchSection from "../ui/search";
import { useCallback, useState } from "react";
import { DEFAULT_PAGINATION, GetPaymentHistoryResponse, paginationType } from "@/types/billing";
import { getPaymentHistoryAction } from "@/utils/graphql/billing/action";
import { debounce } from "@/utils/common-service";
import Pagination from "../ui/pagination";


interface BillingProps {
    paymentHistory: GetPaymentHistoryResponse;
}

const Billing = ({ paymentHistory }: BillingProps) => {
    const router = useRouter();
    const [pagination, setPagination] = useState<paginationType>(DEFAULT_PAGINATION);
    const [payementData, setPaymentData] = useState<GetPaymentHistoryResponse>(paymentHistory);
    const [loading, setLoading] = useState(false);

    const fetchPaymentHistoryData = async (paginate: paginationType) => {
        try {
            const res = await getPaymentHistoryAction({
                page: paginate.page,
                limit: paginate.limit,
                search: paginate.search || null,
                sort: SORT_ORDER.DESC,
                sortBy: "date",
            });
            setPaymentData(res);
        } catch (error) {
            console.error(error, "Failed fetch api")
        } finally {
            setLoading(false);
        }
    }

    const handleDebounce = useCallback(
        debounce((search: string) => {
            const newPagination = { ...pagination, page: pagination.page || 1, search: search };
            setPagination(newPagination);
            fetchPaymentHistoryData(newPagination);
        }, 500),
        []
    );

    const handlePageChange = (page: number) => {
        const newPagination = { ...pagination, page };
        setPagination(newPagination);
        fetchPaymentHistoryData(newPagination);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F9FBFB] via-[#F9FBFB] to-[#D9F2F4] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
            {/* Main Container */}
            <div className="mx-auto flex flex-col gap-10 ">
                {/* Breadcrumb Navigation */}
                <Breadcrumb
                    items={[
                        { label: "Account Settings", href: PRIVATE_PATH.ACCOUNT_SETTINGS },
                        { label: "Billing", isActive: true },
                    ]}
                    onBack={() => router.back()}
                />
                <div className=" lg:px-20">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                        <h1 className="text-[32px] sm:text-[40px] font-semibold text-[#166470]">
                            Billing History
                        </h1>

                        {/* Search and Filter */}
                        <div className="flex gap-3">
                            {/* Search Input */}
                            <SearchSection
                                onSearchChange={handleDebounce}
                                placeholder="Search project concept or issued date"
                            />

                            {/* Filter Button */}
                            <button className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-2 bg-[#009CA6] text-white rounded-lg hover:opacity-90 transition-opacity">
                                <img
                                    src="/assets/images/color-swatch.png"
                                    alt="filter"
                                    className="w-4 h-4 sm:w-[24px] sm:h-[24px]"
                                />
                                <span className="text-[14px] sm:text-[20px] hidden sm:block font-semibold">
                                    Filter
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block bg-white rounded-2xl shadow-[0px_4px_50px_0px_rgba(84,110,116,0.08)] overflow-hidden p-3">
                        <div className="relative">

                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[#E5E5E5]">
                                        <th className="text-left px-2 py-4">
                                            <button className="flex items-center gap-2 text-[14px] sm:text-[16px] font-normal text-[#98B4BC] transition-colors">
                                                Concept
                                                <ChevronsUpDown className="w-4 h-4" />
                                            </button>
                                        </th>
                                        <th className="text-left px-2 py-4">
                                            <button className="flex items-center gap-2 text-[14px] sm:text-[16px] font-normal text-[#98B4BC]  transition-colors">
                                                Amount
                                                <ChevronsUpDown className="w-4 h-4" />
                                            </button>
                                        </th>
                                        <th className="text-left px-2 py-4">
                                            <button className="flex items-center gap-2 text-[14px] sm:text-[16px] font-normal text-[#98B4BC]  transition-colors">
                                                Status
                                                <ChevronsUpDown className="w-4 h-4" />
                                            </button>
                                        </th>
                                        <th className="text-left px-2 py-4">
                                            <button className="flex items-center gap-2 text-[14px] sm:text-[16px] font-normal text-[#98B4BC]  transition-colors">
                                                Issued Date
                                                <ChevronsUpDown className="w-4 h-4" />
                                            </button>
                                        </th>
                                        <th className="w-12"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        payementData.payments.length > 0 ? (
                                            payementData.payments.map((paymentItem) => (
                                                <TableRow key={paymentItem.id} paymentItem={paymentItem} />
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
                                currentPage={payementData.page}
                                totalItems={payementData.total}
                                itemsPerPage={payementData.limit}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Billing;