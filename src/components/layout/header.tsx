"use client";

import { Menu } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { HEADER_CONSTANTS, PUBLIC_PATH } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/store/reducers/auth-reducer";
import ConfirmationModal from "../ui/confirmation-modal";
import { useState } from "react";


interface HeaderProps {
  readonly onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push(PUBLIC_PATH.LOGIN);
  };

  return (
    <>
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
            <img src="/assets/images/coin.png" alt="Credits" className="w-5 h-5" />
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
            onClick={() => setConfirmationModal(true)}
            className="px-4 py-2 text-[14px] lg:text-[16px] font-semibold text-white bg-[#009CA6] rounded-lg hover:opacity-90 transition-opacity"
          >
            Logout
          </button>
        </div>
      </header>

      <ConfirmationModal
        description="Please confirm if you want to sign out of your account."
        title="Sign Out Confirmation"
        isOpen={confirmationModal}
        variant="warning"
        onConfirm={handleLogout}
        onClose={() => {
          setConfirmationModal(false);
        }}
      />
    </>
  );
}
