"use client";

import { Toaster as SonnerToaster } from "sonner";

const Toaster = () => {
  return (
    <SonnerToaster
      position="top-right"
      duration={4000}
      expand={true}
      richColors
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group flex items-center gap-3 p-4 bg-white border border-[#E6EFF5] rounded-xl shadow-[0px_4px_20px_0px_rgba(84,110,116,0.1)] font-manrope min-w-[320px] pointer-events-auto",
          success: "border-[#009CA6]/20",
          error: "border-red-100",
          title: "text-[15px] font-semibold text-[#166470]",
          description: "text-sm text-[#525F69]",
          icon: "shrink-0",
        },
      }}
    />
  );
};

export default Toaster;
