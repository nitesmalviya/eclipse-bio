import React from "react";
import type { Project } from "@/src/types/project";
import { formatDateUTC } from "@/src/utils/common-service";

interface AssayType {
    name: string;
}

interface TableCardProps {
    projectsList: Project[];
    assaysList: AssayType[];
}

const TableProjectsCard = ({ projectsList, assaysList }: TableCardProps) => {
    return (
        <div className="flex-1 flex flex-col gap-6">
            <h2 className="font-titillium font-semibold text-[30px] leading-none text-[#166470]">
                Featured projects
            </h2>

            <div className="rounded-2xl border border-[#D5DADD] overflow-hidden">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F7F9FB] border-b border-[#D5DADD]">
                            <th className="px-6 md:px-8 py-4 text-center">Name</th>
                            <th className="px-6 md:px-8 py-4 text-center">Assay</th>
                            <th className="px-6 md:px-8 py-4 text-center">Created</th>
                        </tr>
                    </thead>

                    <tbody>
                        {projectsList.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="text-center py-4">
                                    No projects available
                                </td>
                            </tr>
                        ) : (
                            projectsList.slice(0, 5).map((project) => (
                                <tr
                                    key={project.id}
                                    className="table-row border-b border-[#D5DADD] last:border-b-0 hover:bg-slate-50 transition-colors"
                                >
                                    <td className="px-6 md:px-8 py-6 md:py-8 font-titillium text-sm md:text-base text-[#202024] align-middle text-center">{project.name}</td>
                                    <td className="px-6 md:px-8 py-6 md:py-8 font-titillium text-sm md:text-base text-[#202024] align-middle text-center">
                                        <div className="w-full flex justify-center">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize inline-block bg-[#FFF8E6] text-[#F59E0B]">{project.active_status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-8 py-6 md:py-8 font-titillium text-sm md:text-base text-[#202024] align-middle text-center">
                                        {formatDateUTC(project?.created_at, "DD/MM/YYYY")}
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

export default TableProjectsCard;
