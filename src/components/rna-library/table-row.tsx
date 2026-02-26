
"use client";
import { ArrowUpRight, Download, Ellipsis } from "lucide-react";
import { useState, useRef } from "react";

const TableRow = ({ rnaSequenceItem, index }: any) => {
  const [selectedSequences, setSelectedSequences] = useState<number[]>([]);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const [menuPlacement, setMenuPlacement] = useState<"top" | "bottom">(
    "bottom",
  );
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (activeMenuIndex === index) {
      setActiveMenuIndex(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If less than 200px below (typical height of our menu), show it upward
      setMenuPlacement(spaceBelow < 200 ? "top" : "bottom");
      setActiveMenuIndex(index);
    }
  };

  const toggleSequenceSelection = (index: number) => {
    setSelectedSequences((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (



    <tr

      className="table-row border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
    >
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          {/* <input
            id={`checkbox-${rnaSequenceItem.id}`}
            className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] cursor-pointer appearance-none border-2 border-[#009CA6] rounded checked:bg-[#009CA6] focus:ring-1 focus:ring-[#009CA6] focus:ring-offset-0"
            type="checkbox"
            name={`checkbox-${sequence.id}`}
          /> */}
          <input
            id={`checkbox-${index}`}
            name={`checkbox-${index}`}
            type="checkbox"
            checked={selectedSequences.includes(index)}
            onChange={() => toggleSequenceSelection(index)}
            className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] cursor-pointer appearance-none border-2 border-[#009CA6] rounded checked:bg-[#009CA6] focus:ring-1 focus:ring-[#009CA6] focus:ring-offset-0"
            style={{
              backgroundImage: selectedSequences.includes(
                index,
              )
                ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`
                : "none",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <span className="text-[16px] text-[#202024] text-center">{rnaSequenceItem.id}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-[16px] text-[#202024] text-center">
        {rnaSequenceItem.source}
      </td>
      <td className="py-4 px-4 text-[16px] text-[#202024] text-center">
        {rnaSequenceItem.status}
      </td>
      <td className="py-4 px-4 text-[16px] text-[#202024] text-center">
        {rnaSequenceItem.rna_type}

      </td>
      <td className="py-4 px-4 text-[16px] text-[#202024] text-center">
        {rnaSequenceItem.validation_results ? rnaSequenceItem.validation_results.length : "-"}
      </td>
      <td className="py-4 px-4 text-[16px] text-[#202024] text-center">
        {rnaSequenceItem.created_at ? new Date(rnaSequenceItem.created_at).toLocaleDateString() : "N/A"}
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center justify-end gap-2">
          <button className="p-2 hover:bg-[#E6F7F8] rounded-lg transition-colors group">
            <Download className="w-5 h-5 text-[#009CA6] group-hover:opacity-100 opacity-0 transition-opacity" />
          </button>
          {/* Action Menu */}
          <div className="relative">
            <button
              onClick={(e) => handleMenuToggle(index, e)}
              className="p-2 hover:bg-[#E6F7F8] rounded-lg transition-colors"
            >
              <Ellipsis className="w-5 h-5 text-[#69A5AF]" />
            </button>
            {activeMenuIndex === index && (
              <div
                ref={menuRef}
                onClick={(e) => e.stopPropagation()}
                className={`absolute right-0 ${menuPlacement === "top"
                  ? "bottom-full mb-2"
                  : "top-full mt-2"
                  } w-48 bg-white rounded-lg shadow-xl border border-[#E5E5E5] z-50 py-2`}
              >
                <button
                  className="w-full text-left px-4 py-2 hover:bg-[#F9FBFB] text-[16px] text-[#525F69]"

                >
                  AI optimize
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-[#F9FBFB] text-[16px] text-[#525F69] border-t border-[#E5E5E5]">
                  Order sequence
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-[#F9FBFB] text-[16px] border-t border-[#E5E5E5] text-[#525F69]"

                >
                  Validate sequence
                </button>
              </div>
            )}
          </div>
          <button className="p-2 hover:bg-[#E6F7F8] rounded-full border border-[#009CA6] transition-colors">
            <ArrowUpRight className="w-5 h-5 text-[#009CA6]" />
          </button>
        </div>
      </td>
    </tr>

  )
};

export default TableRow;
