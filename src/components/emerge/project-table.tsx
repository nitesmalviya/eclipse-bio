"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PRIVATE_PATH, SORT_ORDER } from "@/utils/constant";
import { Project } from "@/types/project";
import NoResourceFound from "../ui/no-resource-found";
import { formatDateUTC, handleSort } from "@/utils/common-service";
import TableHeaderCell from "./table-header-cell";

interface ProjectTableProps {
  projects: Project[] | null;
  activeTab: number;
  onRowClick?: (id: string) => void;
}

const ProjectTable = ({
  projects,
  activeTab,
  onRowClick,
}: ProjectTableProps) => {
  const router = useRouter();
  const isSharedTab = activeTab === 2;

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Project | "owner.display_name";
    order: keyof typeof SORT_ORDER;
  }>({
    key: "name",
    order: SORT_ORDER.ASC,
  });

  const onSort = (key: keyof Project | "owner.display_name") => {
    setSortConfig((prev) => ({
      key,
      order:
        prev.key === key && prev.order === SORT_ORDER.ASC
          ? SORT_ORDER.DESC
          : SORT_ORDER.ASC,
    }));
  };

  // Sort Data
  const sortedData = useMemo(() => {
    if (!projects) return [];
    if (sortConfig.key === "owner.display_name") {
      return [...projects].sort((a, b) => {
        const valA = a.owner?.display_name || "";
        const valB = b.owner?.display_name || "";
        const comparison = valA.localeCompare(valB);
        return sortConfig.order === SORT_ORDER.ASC ? comparison : -comparison;
      });
    }
    return handleSort(
      projects,
      sortConfig.key,
      sortConfig.order,
    );
  }, [projects, sortConfig]);

  // Handle Row Click
  const handleRowClick = (id: string) => {
    if (onRowClick) {
      onRowClick(id);
    } else {
      router.push(`${PRIVATE_PATH.EMERGE_PROJECT_VIEW}/${id}`);
    }
  };

  // Grid Columns
  const gridCols = isSharedTab
    ? "grid-cols-[1fr_2fr_1fr_1.5fr_2fr_auto]"
    : "grid-cols-[2fr_1fr_1.5fr_2fr_auto]";

     

  return (
    <div className="w-full bg-white overflow-x-auto">
      {projects && projects?.length > 0 ? (
        <div className="min-w-[800px]">
          {/* Table Header */}
          <div
            className={`grid ${gridCols} gap-4 px-6 py-4 border-b border-gray-200`}
          >
            {isSharedTab && (
              <TableHeaderCell
                label="Owner"
                sortKey="owner.display_name"
                currentSortKey={sortConfig.key}
                currentSortOrder={sortConfig.order}
                onSort={onSort}
              />
            )}
            <TableHeaderCell
              label="Title"
              sortKey="name"
              currentSortKey={sortConfig.key}
              currentSortOrder={sortConfig.order}
              onSort={onSort}
            />
            <TableHeaderCell
              label="Identifier"
              sortKey="identifier"
              currentSortKey={sortConfig.key}
              currentSortOrder={sortConfig.order}
              onSort={onSort}
            />
            <TableHeaderCell
              label="Dates"
              sortKey="start_date"
              currentSortKey={sortConfig.key}
              currentSortOrder={sortConfig.order}
              onSort={onSort}
            />
            <TableHeaderCell
              label="Status"
              sortKey="status"
              currentSortKey={sortConfig.key}
              currentSortOrder={sortConfig.order}
              onSort={onSort}
            />
            <div className="w-10"></div>
          </div>

          {/* Table Rows */}
          {sortedData?.map((project, idx) => (
            <button
              key={project.id || idx}
              className={`w-full text-left grid ${gridCols} gap-4 px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors group`}
              onClick={() => handleRowClick(project.id)}
            >
              {/* Owner */}
              {isSharedTab && (
                <div className="text-sm text-gray-900 font-titillium">
                  {project?.owner?.display_name ?? "--"}
                </div>
              )}
              {/* Title */}
              <div className="text-sm text-gray-900 truncate font-titillium font-semibold">
                {project?.name ?? "--"}
              </div>
              {/* Identifier */}
              <div className="text-sm text-gray-900 font-titillium">
                {project?.identifier ?? "--"}
              </div>
              {/* Dates */}
              <div className="text-sm text-gray-900 font-titillium">
                {project?.start_date
                  ? formatDateUTC(project.start_date, "DD/MM/YYYY")
                  : "--"}{" "}
                -{" "}
                {project?.target_end_date
                  ? formatDateUTC(
                      project.actual_end_date || project.target_end_date,
                      "DD/MM/YYYY",
                    )
                  : "--"}
              </div>
              {/* Status */}
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-900 font-titillium font-semibold">
                  {project?.status ?? "--"}
                </span>
                <div className="w-full h-1.5 bg-[#f0f2f4] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#009ca6] rounded-full"
                    style={{
                      width: `${project?.progress_percentage || 0}%`,
                    }}
                  ></div>
                </div>
              </div>
              {/* Action */}
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border border-[#009ca6] flex items-center justify-center hover:bg-[rgba(0,156,166,0.05)] transition-colors">
                  <Image
                    src="/assets/svgs/send.svg"
                    alt="Go"
                    width={14}
                    height={14}
                    style={{
                      filter:
                        "invert(52%) sepia(89%) saturate(464%) hue-rotate(131deg) brightness(91%) contrast(101%)",
                    }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <NoResourceFound />
      )}
    </div>
  );
};

export default ProjectTable;
