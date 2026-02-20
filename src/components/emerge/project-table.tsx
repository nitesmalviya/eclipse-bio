
"use client";

import React from "react";
import type { Project } from "@/src/types/project";

interface ProjectTableProps {
  projectsList: Project[];
  activeTab?: number;
}

const ProjectTable = ({ projectsList }: ProjectTableProps) => {
  const [sortConfig, setSortConfig] = React.useState<{ key: keyof Project, direction: 'asc' | 'desc' } | null>(null);
  const [sortedProjects, setSortedProjects] = React.useState<Project[]>(projectsList);

  React.useEffect(() => {
    let sortableProjects = [...projectsList];
    if (sortConfig !== null) {
      sortableProjects.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    setSortedProjects(sortableProjects);
  }, [projectsList, sortConfig]);

  const handleSorting = (key: keyof Project) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="w-full bg-white overflow-x-auto">
      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-[#F7F9FB] border-b border-gray-200">
            <th className="px-6 py-4 text-center">
              <button
                className="text-sm font-semibold text-gray-500 uppercase cursor-pointer flex items-center bg-transparent border-none p-0 focus:outline-none"
                type="button"
                onClick={() => handleSorting('owner')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('owner'); }}
                tabIndex={0}
                aria-label="Sort by Owner"
              >
                Owner
                {sortConfig?.key === 'owner' && (
                  <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </button>
            </th>
            <th className="px-6 py-4 text-center">
              <button
                className="text-sm font-semibold text-gray-500 uppercase cursor-pointer flex items-center bg-transparent border-none p-0 focus:outline-none"
                type="button"
                onClick={() => handleSorting('name')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('name'); }}
                tabIndex={0}
                aria-label="Sort by Title"
              >
                Title
                {sortConfig?.key === 'name' && (
                  <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </button>
            </th>
            <th className="px-6 py-4 text-center">
              <button
                className="text-sm font-semibold text-gray-500 uppercase cursor-pointer flex items-center bg-transparent border-none p-0 focus:outline-none"
                type="button"
                onClick={() => handleSorting('identifier')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('identifier'); }}
                tabIndex={0}
                aria-label="Sort by Identifier"
              >
                Identifier
                {sortConfig?.key === 'identifier' && (
                  <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </button>
            </th>
            <th className="px-6 py-4 text-center">
              <button
                className="text-sm font-semibold text-gray-500 uppercase cursor-pointer flex items-center bg-transparent border-none p-0 focus:outline-none"
                type="button"
                onClick={() => handleSorting('start_date')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('start_date'); }}
                tabIndex={0}
                aria-label="Sort by Dates"
              >
                Dates
                {sortConfig?.key === 'start_date' && (
                  <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </button>
            </th>
            <th className="px-6 py-4 text-center">
              <button
                className="text-sm font-semibold text-gray-500 uppercase cursor-pointer flex items-center bg-transparent border-none p-0 focus:outline-none"
                type="button"
                onClick={() => handleSorting('status')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('status'); }}
                tabIndex={0}
                aria-label="Sort by Status"
              >
                Status
                {sortConfig?.key === 'status' && (
                  <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProjects.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                <div className="w-full  bg-white rounded-3xl p-10 md:p-14 shadow-[0px_4px_20px_0px_rgba(110,125,128,0.08)] flex flex-col items-center text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-[#F9FBFB] rounded-full flex items-center justify-center mb-8">
                    <img alt="No Results" loading="lazy" width="48" height="48" decoding="async" data-nimg="1" className="opacity-60" src="/assets/svgs/search-normal.svg" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="font-manrope font-normal text-2xl md:text-[32px] leading-tight text-[#166470]">No resource found</h2>
                    <p className="font-titillium font-normal text-sm md:text-base leading-6 text-[#525F69] max-w-md mx-auto">We couldn't find any resources matching your criteria. Please try adjusting your filters or search terms.</p>
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            sortedProjects.map((projectItem) => (
              <tr
                key={projectItem.id}
                className="grid grid-cols-6 gap-4 px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-6 text-center align-middle">
                  <div className="text-sm text-gray-900 truncate font-titillium font-semibold max-w-[200px] mx-auto">
                    {projectItem.owner?.display_name || "N/A"}
                  </div>
                </td>

                <td className="px-6 py-6 text-center align-middle">
                  <div className="text-sm text-gray-900 truncate font-titillium font-semibold max-w-[200px] mx-auto">
                    {projectItem.name || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-6 text-center align-middle">
                  <div className="text-sm text-gray-900 truncate font-titillium font-semibold max-w-[200px] mx-auto">
                    {projectItem.identifier || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-6 text-center align-middle">
                  <div className="text-sm text-gray-900 truncate font-titillium font-semibold max-w-[200px] mx-auto">
                    {projectItem.start_date || "N/A"} -{" "}
                    {projectItem.target_end_date || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-6 text-center align-middle">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-900 truncate font-titillium font-semibold max-w-[200px] mx-auto">
                      {projectItem.active_status || projectItem.status || "N/A"}
                    </span>

                    <div className="w-full h-1.5 bg-[#f0f2f4] rounded-full">
                      <div
                        className="h-full bg-[#009ca6] rounded-full"
                        style={{
                          width: `${projectItem.progress_percentage || 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                <td>
                  <div className="flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-teal-500 flex items-center justify-center hover:bg-teal-50 transition-colors">
                      <img alt="Go" loading="lazy" width="16" height="16" decoding="async" data-nimg="1" src="/assets/svgs/send.svg" style="color: transparent; filter: invert(52%) sepia(89%) saturate(464%) hue-rotate(131deg) brightness(91%) contrast(101%);" />
                    </div>
                  </div>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
