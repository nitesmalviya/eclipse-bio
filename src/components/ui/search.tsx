import { Search } from "lucide-react";
import { Input } from "./input";

interface SearchFilterProps {
  onSearchChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchFilter({
  onSearchChange,
  placeholder = "Search...",
  className,
}: SearchFilterProps) {
  return (
    <div className={`relative flex-1 sm:flex-initial gap-[16px] ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[24px] h-[24px] text-[#98B4BC]" />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full sm:w-[280px] pl-10 pr-4 py-2.5 sm:py-3 border border-[#E5E5E5] rounded-lg text-[14px] sm:text-[15px] text-[#525F69] placeholder:text-[#98B4BC] placeholder:text-[16px] sm:placeholder:text-[16px] focus:outline-none focus:border-[#009CA6] focus:ring-1 focus:ring-[#009CA6] h-auto"
      />
    </div>
  );
}
