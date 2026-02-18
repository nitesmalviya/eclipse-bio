
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
      <div className="min-w-[800px]">

        {/* Header */}
        <div className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-gray-200">
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
          <button
            className="text-sm font-semibold text-gray-500 uppercase cursor-pointer flex items-center bg-transparent border-none p-0 focus:outline-none"
            type="button"
            onClick={() => handleSorting('name')}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('name'); }}
            tabIndex={0}
            aria-label="Sort by Owner"
          >
            Title
            {sortConfig?.key === 'name' && (
              <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
            )}
          </button>
          <button
            className="text-sm font-semibold text-gray-500 uppercase cursor-pointer flex items-center bg-transparent border-none p-0 focus:outline-none"
            type="button"
            onClick={() => handleSorting('identifier')}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('identifier'); }}
            tabIndex={0}
            aria-label="Sort by identifier"
          >
            Identifier
            {sortConfig?.key === 'identifier' && (
              <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
            )}
          </button>
          <div className="text-sm font-semibold text-gray-500 uppercase">Dates</div>
          <div className="text-sm font-semibold text-gray-500 uppercase">Status</div>
          <div></div>
        </div>

        {sortedProjects.map((projectItem) => (
          <div
            key={projectItem.id}
            className="grid grid-cols-6 gap-4 px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <div className="text-sm text-gray-900">
              {projectItem.owner?.display_name || "N/A"}
            </div>

            <div className="text-sm text-gray-900 font-semibold">
              {projectItem.name || "N/A"}
            </div>

            <div className="text-sm text-gray-900">
              {projectItem.identifier || "N/A"}
            </div>

            <div className="text-sm text-gray-900">
              {projectItem.start_date || "N/A"} -{" "}
              {projectItem.target_end_date || "N/A"}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold">
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

            <div className="flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border border-[#009ca6] flex items-center justify-center">
                →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTable;
