"use client";

import { Menu } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { HEADER_CONSTANTS } from "@/src/utils/constant";
import { appLogout } from "@/src/store/actions/auth-action";
import { useRouter } from "next/navigation";


interface HeaderProps {
  readonly onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(appLogout());
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[240px] h-[104px] bg-white border-b border-[#E6EFF5] z-30 flex items-center justify-between px-[24px] py-[16px] lg:px-[32px] lg:py-[24px]">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu (Mobile Only) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-[24px] h-[24px] text-[#009CA6]" />
        </button>

        {/* Welcome Text */}
        <h1 className="text-[20px] lg:text-[30px] font-semibold text-[#166470]">
          {HEADER_CONSTANTS.TITLE || ""}
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Total Credits */}
        <div className="hidden sm:flex items-center gap-2">
          <img src="/coin.png" alt="Credits" className="w-5 h-5" />
          <span className="text-[14px] lg:text-[16px] text-[#009CA6] font-semibold">
            Total Credits: <span className="text-[#525F69]">00</span>
          </span>
        </div>
        {/* User Profile */}
        {user && <div className="flex items-center justify-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#009CA6] flex items-center justify-center text-white font-semibold text-[16px] lg:text-[20px]">
            {user?.first_name?.charAt(0)?.toUpperCase()}
          </div>

          {/* User Name (Hidden on small mobile) */}
          <span className="hidden md:block text-[14px] lg:text-[16px] text-[#525F69] font-normal">
            {((user?.first_name ?? "") + " " + (user?.last_name ?? "")) || ""}
          </span>
        </div>}
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-[14px] lg:text-[16px] font-semibold text-white bg-[#009CA6] rounded-lg hover:opacity-90 transition-opacity"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
