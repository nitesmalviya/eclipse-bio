"use client";

import { PRIVATE_PATH } from "@/src/utils/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { icon: "assets/images/home-2.png", label: "Home", href: PRIVATE_PATH.ECOMPASS_HOME },
    {
      icon: "assets/images/dna.png",
      label: "eMERGE",
      href: PRIVATE_PATH.EMERGE_HOME,
    },
    {
      icon: "assets/images/dna.png",
      label: "eVERSE",
      href: PRIVATE_PATH.EVERSE_HOME,
    },
    {
      icon: "assets/images/color-swatch.png",
      label: "RNA Library",
      href: PRIVATE_PATH.RNA_LIBRARY,
    },
    { icon: "assets/images/sms.png", label: "Contact us", href: "#" },
    { icon: "assets/images/setting-2.png", label: "Settings", href: PRIVATE_PATH.ACCOUNT_SETTINGS },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          className="fixed inset-0 bg-white/10  backdrop-brightness-60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={` flex flex-col items-center  fixed top-0 left-0 h-full w-[240px]  bg-[#F9FBFB] border-r border-[#E6EFF5] z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Logo */}
        <div className="py-[48px]">
          <img
            src="assets/images/app-logo.png"
            alt="EclipseBio"
            className="h-[34px] w-auto"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="px-[24px flex flex-col gap-[24px]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-[16px] px-[16px] py-[12px] rounded-lg transition-colors ${active
                  ? "bg-[#009CA6] text-white"
                  : "text-[#525F69] hover:bg-[#E6F7F8]"
                  }`}
              >
                <img src={Icon} className="w-[24px] h-[24px]" alt="Icon"/>
                <span className="text-[18px] font-normal">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
