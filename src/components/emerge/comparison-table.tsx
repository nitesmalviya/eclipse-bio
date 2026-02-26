
"use client";
import { formatDateUTC } from "@/utils/common-service";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import type { Comparisons } from "@/types/comparison-list";

interface ComparisonTableProps {
  comparisons: Comparisons[] | null;
  activeTab?: number;
  onRowClick?: (id: string) => void;
}

const ComparisonTable = ({ comparisons, onRowClick }: ComparisonTableProps) => {
  const [sortConfig, setSortConfig] = React.useState<{ key: keyof Comparisons, direction: 'asc' | 'desc' } | null>(null);
  const [sortedComparisons, setSortedComparisons] = useState<Comparisons[]>(comparisons ?? []);

  useEffect(() => {
    let sortableComparisons = [...(comparisons ?? [])];
    if (sortConfig !== null) {
      sortableComparisons.sort((a, b) => {
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
    setSortedComparisons(sortableComparisons);
  }, [comparisons, sortConfig]);

  const handleSorting = (key: keyof Comparisons) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="w-full bg-white overflow-x-auto">
      <table className="w-full border-collapse">

        {/* Header */}
        <thead>
          <tr className="bg-[#F7F9FB] border-b border-gray-200">
            <th className="px-6 py-4 text-center">
              <button
                className="flex items-center gap-1.5 cursor-pointer group bg-transparent border-0 p-0 justify-center mx-auto"
                type="button"
                onClick={() => handleSorting('title')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('title'); }}
                tabIndex={0}
                aria-label="Sort by Owner"
              >
                <span className="text-sm font-semibold text-gray-600 font-titillium uppercase tracking-wider transition-colors group-hover:text-[#166470]">
                  Title
                </span>

                {sortConfig?.key === 'title' && (
                  <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </button>
            </th>
            <th className="px-6 py-4 text-center">
              <button
                className="flex items-center gap-1.5 cursor-pointer group bg-transparent border-0 p-0 justify-center mx-auto"
                type="button"
                onClick={() => handleSorting('assay_type')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('assay_type'); }}
                tabIndex={0}
                aria-label="Sort by assay_type"
              >

                <span className="text-sm font-semibold text-gray-600 font-titillium uppercase tracking-wider transition-colors group-hover:text-[#166470]">
                  Assay
                </span>
                {sortConfig?.key === 'assay_type' && (
                  <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </button>
            </th>
            <th className="px-6 py-4 text-center">
              <button
                className="flex items-center gap-1.5 cursor-pointer group bg-transparent border-0 p-0 justify-center mx-auto"
                type="button"
                onClick={() => handleSorting('projects_count')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('projects_count'); }}
                tabIndex={0}
                aria-label="Sort by assay_type"
              >

                <span className="text-sm font-semibold text-gray-600 font-titillium uppercase tracking-wider transition-colors group-hover:text-[#166470]">
                  Projects
                </span>
                {sortConfig?.key === 'projects_count' && (
                  <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </button>
            </th>
            <th className="px-6 py-4 text-center">
              <button
                className="flex items-center gap-1.5 cursor-pointer group bg-transparent border-0 p-0 justify-center mx-auto"
                type="button"
                onClick={() => handleSorting('comparison_start_date')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('comparison_start_date'); }}
                tabIndex={0}
                aria-label="Sort by assay_type"
              >
                <span className="text-sm font-semibold text-gray-600 font-titillium uppercase tracking-wider transition-colors group-hover:text-[#166470]">
                  Comparison start
                </span>

                {sortConfig?.key === 'comparison_start_date' && (
                  <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </button>
            </th>
            <th className="px-6 py-4 text-center">
              <button
                className="flex items-center gap-1.5 cursor-pointer group bg-transparent border-0 p-0 justify-center mx-auto"
                type="button"
                onClick={() => handleSorting('comparison_end_date')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('comparison_end_date'); }}
                tabIndex={0}
                aria-label="Sort by assay_type"
              >

                <span className="text-sm font-semibold text-gray-600 font-titillium uppercase tracking-wider transition-colors group-hover:text-[#166470]">
                  Comparison end
                </span>
                {sortConfig?.key === 'comparison_end_date' && (
                  <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </button>
            </th>
            <th className="w-10 px-6 py-4 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {sortedComparisons.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-10 text-gray-500">
                No comparisons found.
              </td>
            </tr>
          ) : (
            sortedComparisons.map((comparisonItem) => (
              <tr
                key={comparisonItem.id}
                className="table-row border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-6 text-center align-middle">
                  <div className="text-sm text-gray-900 truncate font-titillium font-semibold max-w-[200px] mx-auto">
                    {comparisonItem.title ?? "--"}
                  </div>
                </td>

                <td className="px-6 py-6 text-center align-middle">
                  <div className="text-sm text-gray-900 truncate font-titillium font-semibold max-w-[200px] mx-auto">
                    {comparisonItem.assay_type ?? "--"}
                  </div>
                </td>

                <td className="px-6 py-6 text-center align-middle">
                  <div className="text-sm text-gray-900 truncate font-titillium font-semibold max-w-[200px] mx-auto">
                    {comparisonItem.projects_count ?? "--"}
                  </div>
                </td>

                <td className="px-6 py-6 text-center align-middle">
                  <div className="text-sm text-gray-900 truncate font-titillium font-semibold max-w-[200px] mx-auto">
                    {comparisonItem?.comparison_start_date
                      ? formatDateUTC(comparisonItem.comparison_start_date, "DD/MM/YYYY")
                      : "--"}
                  </div>
                </td>

                <td className="px-6 py-6 text-center align-middle">
                  <div className="text-sm text-gray-900 truncate font-titillium font-semibold max-w-[200px] mx-auto">
                    {comparisonItem?.comparison_end_date
                      ? formatDateUTC(comparisonItem.comparison_end_date, "DD/MM/YYYY")
                      : "--"}
                  </div>
                </td>

                <td className="px-6 py-6 text-center align-middle">
                  <div className="flex items-center justify-center">
                    <button
                      className="w-10 h-10 rounded-full border border-teal-500 flex items-center justify-center hover:bg-teal-50 transition-colors"
                      onClick={() => {
                        if (typeof onRowClick === "function")
                          onRowClick(comparisonItem.id);
                      }}
                      aria-label="Go to comparison"
                      type="button"
                    >
                      <Image
                        src="/assets/svgs/send.svg"
                        alt="Go"
                        width={16}
                        height={16}
                        style={{
                          filter:
                            "invert(52%) sepia(89%) saturate(464%) hue-rotate(131deg) brightness(91%) contrast(101%)",
                        }}
                      />
                    </button>
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

export default ComparisonTable;
