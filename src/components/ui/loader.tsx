"use client";

import { cn } from "@/src/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  overlay?: boolean;
  text?: string;
}

const Loader = ({
  className,
  size = "md",
  overlay = false,
  text,
}: LoaderProps) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const loaderContent = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <div className={cn("relative", sizeClasses[size])}>
        <div className="absolute inset-0 rounded-full border-4 border-[#009CA6]/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-[#009CA6] animate-spin"></div>
      </div>
      {text && (
        <p className="text-[16px] font-semibold text-[#166470] font-manrope animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/10 backdrop-blur-md">
        <div className="bg-white/90 p-8 rounded-3xl shadow-[0px_4px_50px_0px_rgba(84,110,116,0.1)] border border-white/20">
          {loaderContent}
        </div>
      </div>
    );
  }

  return loaderContent;
};

export default Loader;
