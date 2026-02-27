"use client";

import { Menu } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { HEADER_CONSTANTS } from "@/utils/constant";


interface HeaderProps {
  readonly onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAppSelector((state) => state.auth);


  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[240px] h-[104px] bg-white border-b border-[#E6EFF5] z-30 flex items-center justify-between px-[24px] py-[16px] lg:px-[32px] lg:py-[24px]">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-[24px] h-[24px] text-[#009CA6]" />
        </button>
        <h1 className="text-[20px] lg:text-[30px] font-semibold text-[#166470]">
          {HEADER_CONSTANTS.TITLE || ""}
        </h1>
      </div>
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="hidden sm:flex items-center gap-2">
          <img src="/assets/images/coin.png" alt="Credits" className="w-5 h-5" />
          <span className="text-[14px] lg:text-[16px] text-[#009CA6] font-semibold">
            Total Credits: <span className="text-[#525F69]">00</span>
          </span>
        </div>
        {user && <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#009CA6] flex items-center justify-center text-white font-semibold text-[16px] lg:text-[20px]">
            {user?.first_name?.charAt(0)?.toUpperCase()}
          </div>
          <span className="hidden md:block text-[14px] lg:text-[16px] text-[#525F69] font-normal">
            {((user?.first_name ?? "") + " " + (user?.last_name ?? "")) || ""}
          </span>
        </div>}

      </div>
    </header>
  );
}
