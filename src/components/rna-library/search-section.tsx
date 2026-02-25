"use client";
import Image from "next/image";

export default function SearchSection({
  searchQuery,
  handleSearch,
}: {
  readonly searchQuery: string;
  readonly handleSearch: (value: string) => void;
}) {
  return (
    <div className="relative w-full lg:w-80">
      <input
        type="text"
        placeholder="Search"
        className="w-full h-12 rounded-lg border border-[#d5dadd] pl-10 pr-4 font-manrope text-sm outline-none focus:border-[#009ca6] placeholder:text-[#95a3ab]"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none">
        <Image
          src="/assets/svgs/search-normal.svg"
          alt="Search"
          width={16}
          height={16}
        />
      </div>
    </div>
  );
}
