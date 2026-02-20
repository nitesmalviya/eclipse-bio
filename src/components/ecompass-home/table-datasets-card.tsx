import { formatDateUTC } from "@/src/utils/common-service";
import React from "react";

interface AssayType {
    name: string;
}


export interface DatasetType {
    id: string;
    name: string;
    assay_type: string;
    created_at: string;
}

interface TableCardProps {
    datasetsList: DatasetType[];
}

const TableDataSetsCard = ({ datasetsList }: TableCardProps) => {

    return (
        <div className="flex-1 flex flex-col gap-6">
            <h2 className="font-titillium font-semibold text-[30px] leading-none text-[#166470]">
                Featured datasets
            </h2>

            <div className="rounded-2xl border border-[#D5DADD] overflow-hidden">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F7F9FB] border-b border-[#D5DADD]">
                            <th className="px-6 md:px-8 py-4 text-center">Name</th>
                            <th className="px-6 md:px-8 py-4 text-center">Assay type</th>
                            <th className="px-6 md:px-8 py-4 text-center">Created</th>
                        </tr>
                    </thead>

                    <tbody>
                        {datasetsList.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="text-center py-4">
                                    No datasets available
                                </td>
                            </tr>
                        ) : (
                            datasetsList.slice(0, 5).map((dataset) => (
                                <tr
                                    key={dataset.id}
                                    className="table-row border-b border-[#D5DADD] last:border-b-0 hover:bg-slate-50 transition-colors"
                                >
                                    <td className="px-6 md:px-8 py-6 md:py-8 font-titillium text-sm md:text-base text-[#202024] align-middle text-center">{dataset.name}</td>
                                    <td className="px-6 md:px-8 py-6 md:py-8 font-titillium text-sm md:text-base text-[#202024] align-middle text-center">{dataset.assay_type}</td>
                                    <td className="px-6 md:px-8 py-6 md:py-8 font-titillium text-sm md:text-base text-[#202024] align-middle text-center">
                                        {formatDateUTC(dataset?.created_at, "DD/MM/YYYY")}
                                    </td>



                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableDataSetsCard;
