"use client";
import Image from "next/image";
import { SORT_ORDER } from "@/utils/constant";

interface TableHeaderCellProps<T> {
  label: string;
  sortKey?: T;
  currentSortKey?: T;
  currentSortOrder?: keyof typeof SORT_ORDER;
  onSort?: (key: T) => void;
  className?: string;
}

const TableHeaderCell = <T,>({
  label,
  sortKey,
  currentSortKey,
  currentSortOrder,
  onSort,
  className = "",
}: TableHeaderCellProps<T>) => {
  if (!sortKey || !onSort) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm font-semibold text-gray-500 font-titillium uppercase tracking-wider">
          {label}
        </span>
      </div>
    );
  }

  const isActive = currentSortKey === sortKey;
  const isDescending = isActive && currentSortOrder === SORT_ORDER.DESC;

  return (
    <button
      onClick={() => onSort(sortKey)}
      className={`flex items-center gap-2 cursor-pointer group bg-transparent border-0 p-0 ${className}`}
    >
      <span className="text-sm font-semibold text-gray-500 font-titillium uppercase tracking-wider transition-colors group-hover:text-[#166470]">
        {label}
      </span>
      <Image
        src="/assets/images/arrow-sort.png"
        alt="Sort"
        width={14}
        height={14}
        className={`transition-transform ${isDescending ? "rotate-180" : ""} ${
          isActive ? "opacity-100" : "opacity-40"
        }`}
      />
    </button>
  );
};

export default TableHeaderCell;
