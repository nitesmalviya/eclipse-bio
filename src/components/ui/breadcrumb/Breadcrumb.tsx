"use client";
import React from "react";
import Image from "next/image";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onBack?: () => void;
  showBackButton?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onBack,
  showBackButton = true,
}) => {
  return (
    <div className="flex items-center gap-3">
      {showBackButton && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#009ca6] hover:text-[#008891] font-manrope font-semibold bg-transparent border-none cursor-pointer p-0 transition-colors text-sm"
        >
          <Image
            src="/assets/svgs/arrow-left.svg"
            alt="Back"
            width={16}
            height={16}
          />
          Back
        </button>
      )}

      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#f7f9fb] h-8">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <a
                href={item.href}
                className="text-[#95a3ab] font-manrope hover:text-[#009ca6] transition-colors no-underline text-sm whitespace-nowrap"
              >
                {item.label}
              </a>
            ) : (
              <span
                className={`font-manrope text-sm whitespace-nowrap ${
                  item.isActive
                    ? "text-[#525f69] font-semibold"
                    : "text-[#95a3ab]"
                }`}
              >
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="text-[#95a3ab] text-sm">›</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
