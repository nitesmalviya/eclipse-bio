"use client";

interface TableSwitcherProps {
  tabs: string[];
  activeTab: number;
  setActiveTab: (idx: number) => void;
}

const   TableSwitcher = ({
  tabs,
  activeTab,
  setActiveTab,
}: TableSwitcherProps) => {
  return (
    <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
      {tabs.map((tab, idx) => (
        <button
          key={idx + 1}
          onClick={() => setActiveTab(idx)}
          className={`flex-1 min-w-[120px] px-4 md:px-8 py-4 text-sm md:text-base font-semibold transition-colors relative whitespace-nowrap ${
            idx === activeTab
              ? "text-[#009CA6] bg-[#F7F9FB]"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          {tab}
          {idx === activeTab && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.6px] bg-[#009CA6]"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default TableSwitcher;
