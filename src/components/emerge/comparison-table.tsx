
"use client";
import { formatDateUTC } from "@/src/utils/common-service";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ComparisonsType {
  id: string;
  title: string;
  assay_type: string;
  projects_count: string;
  comparison_start_date: string;
  comparison_end_date: string;
}

interface ComparisonTableProps {
  comparisons: ComparisonsType[];
}

const ComparisonTable = ({ comparisons }: ComparisonTableProps) => {
  const [sortConfig, setSortConfig] = React.useState<{ key: keyof ComparisonsType, direction: 'asc' | 'desc' } | null>(null);
  const [sortedComparisons, setSortedComparisons] = useState<ComparisonsType[]>(comparisons);

  console.log(comparisons, "comparisons list")
  useEffect(() => {
    let sortableComparisons = [...comparisons];
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

  const handleSorting = (key: keyof ProjectType) => {
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
        <div className="grid grid-cols-[2fr_1.5fr_0.8fr_1.2fr_1.2fr_auto] gap-4 px-6 py-4 border-b border-gray-200">

          <button
            className="text-sm font-semibold text-gray-500 uppercase cursor-pointer flex items-center bg-transparent border-none p-0 focus:outline-none"
            type="button"
            onClick={() => handleSorting('title')}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('title'); }}
            tabIndex={0}
            aria-label="Sort by Owner"
          >
            Title
            {sortConfig?.key === 'title' && (
              <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
            )}
          </button>
          <button
            className="text-sm font-semibold text-gray-500 uppercase cursor-pointer flex items-center bg-transparent border-none p-0 focus:outline-none"
            type="button"
            onClick={() => handleSorting('assay_type')}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('assay_type'); }}
            tabIndex={0}
            aria-label="Sort by assay_type"
          >
            Assay
            {sortConfig?.key === 'assay_type' && (
              <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
            )}
          </button>
          <button
            className="text-sm font-semibold text-gray-500 uppercase cursor-pointer flex items-center bg-transparent border-none p-0 focus:outline-none"
            type="button"
            onClick={() => handleSorting('projects_count')}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('projects_count'); }}
            tabIndex={0}
            aria-label="Sort by assay_type"
          >
            Projects
            {sortConfig?.key === 'projects_count' && (
              <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
            )}
          </button>
          <button
            className="text-sm font-semibold text-gray-500 uppercase cursor-pointer flex items-center bg-transparent border-none p-0 focus:outline-none"
            type="button"
            onClick={() => handleSorting('comparison_start_date')}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('comparison_start_date'); }}
            tabIndex={0}
            aria-label="Sort by assay_type"
          >
            Comparison start
            {sortConfig?.key === 'comparison_start_date' && (
              <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
            )}
          </button>
          <button
            className="text-sm font-semibold text-gray-500 uppercase cursor-pointer flex items-center bg-transparent border-none p-0 focus:outline-none"
            type="button"
            onClick={() => handleSorting('comparison_end_date')}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSorting('comparison_end_date'); }}
            tabIndex={0}
            aria-label="Sort by assay_type"
          >
            Comparison end
            {sortConfig?.key === 'comparison_end_date' && (
              <span className="ml-2">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
            )}
          </button>
          <div className="w-10"></div>
        </div>

        {sortedComparisons.map((comparisonItem) => (
          <div
            key={comparisonItem.id}
            className="w-full text-left grid grid-cols-[2fr_1.5fr_0.8fr_1.2fr_1.2fr_auto] gap-4 px-6 py-6 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="text-sm text-gray-900 font-semibold">
              {comparisonItem.title ?? "--"}
            </div>
            <div className="text-sm text-gray-900">
              {comparisonItem.assay_type ?? "--"}
            </div>
            <div className="text-sm text-gray-900">
              {comparisonItem.projects_count ?? "--"}

            </div>
            <div className="text-sm text-gray-900 font-titillium">
              {comparisonItem?.comparison_start_date
                ? formatDateUTC(comparisonItem?.comparison_start_date, "DD/MM/YYYY")
                : "--"}
            </div>
            <div className="text-sm text-gray-900 font-titillium">
              {comparisonItem?.comparison_end_date
                ? formatDateUTC(comparisonItem?.comparison_end_date, "DD/MM/YYYY")
                : "--"}
            </div>
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border border-teal-500 flex items-center justify-center hover:bg-teal-50 transition-colors">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonTable;
