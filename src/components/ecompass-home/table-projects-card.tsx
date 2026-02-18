import React from "react";

interface AssayType {
    name: string;
}

interface ProjectType {
    id: string;
    name: string;
    active_status: boolean;
    assays?: AssayType[];
}

interface TableCardProps {
    projectsList: ProjectType[];
}

const TableProjectsCard = ({ projectsList }: TableCardProps) => {
    return (
        <div className="w-full lg:w-[65%] flex flex-col gap-3">
            <h2 className="font-semibold text-xl text-[#009CA6]">
                Featured projects
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
                                    className="border-t border-gray-300 hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">{project.name}</td>
                                    <td className="px-4 py-3">
                                        {(project.assays ?? [])
                                            .map((a) => a.name)
                                            .join(", ") || "N/A"}
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
