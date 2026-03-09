"use client";

import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { PUBLIC_PATH } from "@/utils/constant";

export default function PasswordSuccessPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push(PUBLIC_PATH.LOGIN);
  };

  return (
 
          <div className="flex flex-col justify-center px-6 py-8 sm:py-12 items-center w-full">
            <div className="flex flex-col w-full sm:w-[420px] max-w-full items-center text-center">
              {/* Lock Icon */}
              <div className="mb-6 sm:mb-8">
                <img
                  src="/lock.png"
                  alt="Lock Icon"
                  className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] object-contain"
                />
              </div>

              {/* Success Message */}
              <div className="mb-6 sm:mb-10">
                <h2 className="font-semibold mb-3 sm:mb-4 text-[24px] sm:text-[32px] leading-[110%] text-[#166470] whitespace-nowrap">
                  Password Changed Successfully!
                </h2>
                <p className="text-[14px] sm:text-[15px] leading-[140%] text-[#525F69]">
                  Your password has been successfully updated.
                </p>
              </div>

              {/* Log In Button */}
              <button
                onClick={handleLogin}
                className="w-full text-white text-[18px] sm:text-[20px] font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 bg-[#009CA6] py-3 sm:py-3.5 rounded-lg"
              >
                Log In
                <MoveUpRight className="w-[20px] sm:w-[24px]" />
              </button>
            </div>
          </div>
     
  );
}
