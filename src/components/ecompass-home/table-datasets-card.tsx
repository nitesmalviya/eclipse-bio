import React from "react";

interface AssayType {
    name: string;
}

interface ProjectType {
    id: string;
    name: string;
    assay_type: string;
    active_status: boolean;
    assays: AssayType[];
}

interface TableCardProps {
    datasetsList: ProjectType[];
}

const TableDataSetsCard = ({ datasetsList }: TableCardProps) => {
    return (
        <div className="w-full lg:w-[65%] flex flex-col gap-3">
            <h2 className="font-semibold text-xl text-[#009CA6]">
                Featured datasets
            </h2>

            <div className="rounded-2xl border border-[#D5DADD] overflow-hidden">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 font-semibold">Name</th>
                            <th className="px-4 py-3 font-semibold">Assay type</th>
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
                                    className="border-t border-gray-300 hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">{dataset.name}</td>
                                    <td className="px-4 py-3">{dataset.assay_type}</td>

                                    
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
