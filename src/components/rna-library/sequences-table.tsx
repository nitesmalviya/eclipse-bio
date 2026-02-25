
"use client";
import { ArrowUpRight, Download, Ellipsis } from "lucide-react";
import { useState, useRef } from "react";

const SequencesTable = ({ rnaSequences }: any) => {
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
  return (
    <div className="w-full bg-white overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#E5E5E5]">
            <th className="text-left py-4 px-4 text-[16px] font-semibold text-[#95A3AB]">
              <div className="flex justify-center items-center gap-1">
                <span >
                  Sequence ID
                </span>
                <span className="ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up-down w-[14px] h-[14px]" aria-hidden="true"><path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path></svg>
                </span>
              </div>
            </th>
            <th className="text-left py-4 px-4 text-[16px] font-semibold text-[#95A3AB]">
              <div
                className="flex justify-center items-center gap-1"
              >
                <span >
                  Source
                </span>
                <span className="ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up-down w-[14px] h-[14px]" aria-hidden="true"><path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path></svg>
                </span>
              </div>
            </th>
            <th className="text-left py-4 px-4 text-[16px] font-semibold text-[#95A3AB]">
              <div className="flex justify-center items-center gap-1">
                <span>
                  Status
                </span>
                <span className="ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up-down w-[14px] h-[14px]" aria-hidden="true"><path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path></svg>
                </span>
              </div>
            </th>
            <th className="text-left py-4 px-4 text-[16px] font-semibold text-[#95A3AB]">
              <div className="flex justify-center items-center gap-1">
                <span>
                  Orders
                </span>
                <span className="ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up-down w-[14px] h-[14px]" aria-hidden="true"><path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path></svg>
                </span>
              </div>
            </th>
            <th className="text-left py-4 px-4 text-[16px] font-semibold text-[#95A3AB]">
              <div
                className="flex justify-center items-center gap-1">
                <span className="ml-2">
                  Validations
                </span>
                <span className="ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up-down w-[14px] h-[14px]" aria-hidden="true"><path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path></svg>
                </span>
              </div>
            </th>
            <th className="text-left py-4 px-4 text-[16px] font-semibold text-[#95A3AB]">
              <div className="flex justify-center items-center gap-1">
                <span >
                  Created date
                </span>
                <span className="ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up-down w-[14px] h-[14px]" aria-hidden="true"><path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path></svg>
                </span>
              </div>
            </th>
            <th className="w-10 px-6 py-4 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {
            rnaSequences.length === 0 ? (
              <tr className="border-b border-[#E5E5E5] hover:bg-[#F9FBFB] transition-colors group">
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  No sequences found.
                </td>
              </tr>
            ) : (
              rnaSequences.map((sequence: any, index: number) => (
                <tr
                  key={sequence.id}
                  className="table-row border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <input id={`checkbox-${sequence.id}`} className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] cursor-pointer appearance-none border-2 border-[#009CA6] rounded checked:bg-[#009CA6] focus:ring-1 focus:ring-[#009CA6] focus:ring-offset-0" type="checkbox" name={`checkbox-${sequence.id}`}
                      />
                      <span className="text-[16px] text-[#202024] text-center">{sequence.id}</span>
                    </div></td>
                  <td className="py-4 px-4 text-[16px] text-[#202024] text-center">
                    {sequence.source}
                  </td>
                  <td className="py-4 px-4 text-[16px] text-[#202024] text-center">
                    {sequence.status}
                  </td>
                  <td className="py-4 px-4 text-[16px] text-[#202024] text-center">
                    {sequence.orders ? sequence.orders.length : "N/A"}
                  </td>
                  <td className="py-4 px-4 text-[16px] text-[#202024] text-center">
                    {sequence.validations ? sequence.validations.length : "N/A"}
                  </td>
                  <td className="py-4 px-4 text-[16px] text-[#202024] text-center">
                    {sequence.created_at ? new Date(sequence.created_at).toLocaleDateString() : "N/A"}
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
              ))
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default SequencesTable;
