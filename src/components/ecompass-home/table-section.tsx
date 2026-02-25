"use client";

import NoResourceFound from "../ui/no-resource-found";
import { useState, useMemo } from "react";
import { handleSort } from "@/src/utils/common-service";
import { SORT_ORDER } from "@/src/utils/constant";
import TableHeaderCell from "../emerge/table-header-cell";
import { Project } from "@/src/types/project";
import { FeaturedDataset } from "@/src/types/dataset";

interface TableSectionProps {
  readonly tableTitle: string;
  readonly tableData: Project[] | FeaturedDataset[];
}

export default function TableSection({
  tableTitle,
  tableData,
}: TableSectionProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: "name" | "assay_type";
    order: keyof typeof SORT_ORDER;
  }>({
    key: "name",
    order: SORT_ORDER.ASC,
  });

  const onSort = (key: "name" | "assay_type") => {
    setSortConfig((prev) => ({
      key,
      order:
        prev.key === key && prev.order === SORT_ORDER.ASC
          ? SORT_ORDER.DESC
          : SORT_ORDER.ASC,
    }));
  };

  const sortedData = useMemo(() => {
    return handleSort(tableData, sortConfig.key, sortConfig.order);
  }, [tableData, sortConfig]);

  return (
    <div className="flex-1 flex flex-col gap-6">
      <h2 className="font-titillium font-semibold text-[30px] leading-none align-middle text-[#166470] m-0">
        {tableTitle}
      </h2>

      <div className="rounded-2xl border border-[#D5DADD] overflow-hidden">
        <div className="flex justify-between items-center px-4 md:px-8 py-4 border-b border-[#D5DADD] bg-[#F7F9FB]">
          {/* Title Sort */}
          <TableHeaderCell
            label="Title"
            sortKey="name"
            currentSortKey={sortConfig.key}
            currentSortOrder={sortConfig.order}
            onSort={onSort}
          />

          {/* Assay Sort */}
          <TableHeaderCell
            label="Assay"
            sortKey="assay_type"
            currentSortKey={sortConfig.key}
            currentSortOrder={sortConfig.order}
            onSort={onSort}
          />
        </div>

        <div>
          {sortedData.length > 0 ? (
            sortedData?.slice(0, 5)?.map((row, i) => (
              <div
                key={row?.id || row?.name || i + 1}
                className="flex justify-between items-center px-4 md:px-8 py-6 md:py-8 border-b border-[#D5DADD] last:border-b-0 hover:bg-slate-50 transition-colors"
              >
                <div className="flex-1 font-titillium font-normal text-sm md:text-base leading-5 text-[#202024] overflow-hidden whitespace-nowrap text-ellipsis pr-4">
                  {row?.name ?? "--"}
                </div>
                <div className="w-auto md:w-[200px] font-titillium font-normal text-sm md:text-base leading-4 text-[#202024] text-right">
                  {(row?.assay_type || row?.active_status) ?? "--"}
                </div>
              </div>
            ))
          ) : (
            <NoResourceFound />
          )}
        </div>
      </div>
    </div>
  );
}
