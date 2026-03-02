"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

import SimpleReactValidator from "simple-react-validator";
import Loader from "../../ui/loader";
import Calendar from "../../ui/calendar/Calendar";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: any) => void;
  loading?: boolean;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  loading: isSubmitting = false,
}) => {
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [loading, setLoading] = useState({
    assays: false,
    projects: false,
  });
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const [, forceUpdate] = useState(0);

  const validatorRef = useRef(
    new SimpleReactValidator({
      className: "text-[13px] font-semibold text-[#F4364C] mt-1",
    }),
  );

  const validator = validatorRef.current;


  // Handle apply/submit
  const handleApply = () => {

    if (validator.allValid()) {

      const payload = {
        " null": "This is a placeholder payload. Replace with actual data from form inputs.",
      }
      onSave(payload);
    } else {
      validator.showMessages();
      forceUpdate((prev) => prev + 1);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-start z-100 overflow-y-auto py-10"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-[95%] sm:w-[740px] bg-white rounded-2xl p-6 md:p-10 box-border flex flex-col gap-6 md:gap-10 relative shadow-[0px_8px_32px_rgba(0,0,0,0.24)] my-auto">
        {/* Header */}
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex justify-between items-start">
            <h2 className="flex-1 font-titillium font-semibold text-2xl md:text-[32px] leading-tight text-[#166470] m-0">
              New Project
            </h2>
            <button
              className="w-8 h-8 cursor-pointer flex items-center justify-center border-none bg-transparent hover:opacity-70 transition-opacity"
              onClick={onClose}
            >
              <Image
                src="/assets/svgs/close-circle.svg"
                alt="Close"
                width={28}
                height={28}
                className="opacity-60"
              />
            </button>
          </div>
          <p className="font-titillium text-base font-normal leading-relaxed text-[#525f69] m-0">
            To start a new comparison, first select the type of assay you want
            to analyze. Then, choose the projects you want to include in the
            comparison.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-titillium font-bold text-sm bg-[#009ca6] text-white">1</div>
            <span className="font-titillium text-sm font-semibold text-[#525f69]">Project Details</span>
          </div>
          <div className="flex-1 h-[2px] bg-[#f0f2f4]"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-titillium font-bold text-sm bg-[#f0f2f4] text-[#525f69]">2</div>
            <span className="font-titillium text-sm font-semibold text-[#525f69]">Milestones</span>
          </div>
        </div>
        {/* Title Input */}
        <div className="w-full flex flex-col gap-4">
          <label
            htmlFor="title-input"
            className="font-titillium font-bold text-xl text-[#166470]"
          >
            Project Identifier
          </label>
          <div className="w-full bg-white border-b-2 border-[#009ca6] px-4 py-2.5 flex flex-col gap-1 focus-within:bg-[#009ca6]/[0.02]">
            <span className="font-titillium text-[13px] font-bold text-[#009ca6] uppercase">
              Identifier
            </span>
            <input
              id="identifier"
              name="identifier"
              className="w-full border-none bg-transparent outline-none font-titillium font-semibold text-base text-[#525f69] placeholder:text-[#95a3ab] placeholder:font-normal"
              placeholder="Enter identifier"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <label
            htmlFor="title-input"
            className="font-titillium font-bold text-xl text-[#166470]"
          >
            Project Description
          </label>
          <div className="w-full bg-white border-b-2 border-[#009ca6] px-4 py-2.5 flex flex-col gap-1 focus-within:bg-[#009ca6]/[0.02]">
            <span className="font-titillium text-[13px] font-bold text-[#009ca6] uppercase">
              Description
            </span>
            <input
              id="description"
              name="description"
              className="w-full border-none bg-transparent outline-none font-titillium font-semibold text-base text-[#525f69] placeholder:text-[#95a3ab] placeholder:font-normal"
              placeholder="Enter project description"
            />
          </div>
        </div>
        {/* Date Range Selection */}
        <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-4">
          <div className="flex-1 flex flex-col gap-4 relative">
            <label
              htmlFor="start-date"
              className="font-titillium font-bold text-lg md:text-xl text-[#166470]"
            >
              Project Timeline
            </label>
            <div className="relative">
              <div
                className="w-full bg-white border-b-2 border-[#009ca6] px-4 py-2.5 flex flex-col gap-1 cursor-pointer"
                onClick={() => {
                  setShowStartCalendar(!showStartCalendar);
                  setShowEndCalendar(false);
                  setShowProjectDropdown(false);
                  setShowAssayDropdown(false);
                }}
              >
                <span className="font-titillium text-[13px] font-bold text-[#009ca6] uppercase">
                  Start Date
                </span>
                <input
                  id="start-date"
                  className="w-full border-none bg-transparent outline-none font-titillium font-semibold text-base text-[#525f69] placeholder:text-[#95a3ab] cursor-pointer"
                  placeholder="MM/DD/YYYY"
                  readOnly
                />
              </div>
              {showStartCalendar && (
                <div className="absolute top-[calc(100%+8px)] left-0 z-100">
                  <Calendar
                    onDateSelect={(date) => {
                      setShowStartCalendar(false);
                      validator.showMessageFor("startDate");
                      forceUpdate((prev) => prev + 1);
                    }}
                    onCancel={() => setShowStartCalendar(false)}
                    onNext={() => setShowStartCalendar(false)}
                    maxDate={undefined}
                    startDate={undefined}
                    endDate={undefined}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 relative">
            <label
              htmlFor="end-date"
              className="font-titillium font-bold text-xl text-[#166470] hidden sm:block invisible"
            >
              Target End Date
            </label>
            <div className="relative">
              <div
                className="w-full bg-white border-b-2 border-[#009ca6] px-4 py-2.5 flex flex-col gap-1 cursor-pointer"
                onClick={() => {
                  setShowEndCalendar(!showEndCalendar);
                  setShowStartCalendar(false);
                  setShowProjectDropdown(false);
                  setShowAssayDropdown(false);
                }}
              >
                <span className="font-titillium text-[13px] font-bold text-[#009ca6] uppercase">
                  End Date
                </span>
                <input
                  id="end-date"
                  className="w-full border-none bg-transparent outline-none font-titillium font-semibold text-base text-[#525f69] placeholder:text-[#95a3ab] cursor-pointer"
                  placeholder="MM/DD/YYYY"
                  readOnly
                />
              </div>
              {showEndCalendar && (
                <div className="absolute top-[calc(100%+8px)] left-0 z-100">
                  <Calendar
                    selectedDate={undefined}
                    onDateSelect={(date) => {

                      setShowEndCalendar(false);
                      validator.showMessageFor("endDate");
                      forceUpdate((prev) => prev + 1);
                    }}
                    onCancel={() => setShowEndCalendar(false)}
                    onNext={() => setShowEndCalendar(false)}
                    minDate={undefined}
                    startDate={undefined}
                    endDate={undefined}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Selection with API Search */}
        <div className="w-full flex flex-col gap-4">
          <label
            htmlFor="project-search"
            className="font-titillium font-bold text-xl text-[#166470]"
          >
            Project owner
          </label>
          <div className="relative" ref={projectDropdownRef}>
            <div className="w-full min-h-14 bg-white border-b-2 border-[#009ca6] px-4 py-2.5 flex flex-col gap-2">
              <span className="font-titillium text-[13px] font-bold text-[#009ca6] uppercase">
                Projects
              </span>
              <div className="flex flex-wrap gap-2 items-center">
                <div  className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 bg-[#f0f2f4]/80 border border-[#d5dadd] rounded-lg font-titillium font-semibold text-[13px] text-[#525f69]">
                  <span>
                    jh
                  </span>
                  <button
                    className="bg-transparent border-none p-0 opacity-60 hover:opacity-100 cursor-pointer"

                  >
                    <Image
                      src="/assets/svgs/close-circle.svg"
                      alt="X"
                      width={14}
                      height={14}
                    />
                  </button>
                </div>

                <div className="flex-1 flex items-center gap-2 min-w-[120px]">

                  <Image
                    src="/assets/svgs/search-normal.svg"
                    alt="S"
                    width={18}
                    height={18}
                    className="opacity-40"
                  />

                  <input
                    id="project-search"
                    className="w-full border-none bg-transparent outline-none font-titillium text-base text-[#525f69] placeholder:text-[#95a3ab]"
                    placeholder={
                      "Search projects"
                    }

                    onFocus={() => {

                      setShowEndCalendar(false);
                      setShowStartCalendar(false);

                    }}
                  />
                </div>
              </div>
            </div>

            <div className="  absolute top-[calc(100%+4px)] left-0 right-0 bg-white rounded-lg shadow-lg h-[250px] overflow-y-auto z-100 border border-[#f0f2f4] custom-scrollbar">
              <div
                className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-[#009ca6]/5 border-b last:border-0 border-[#f0f2f4]"
                onClick={() => {
                  validator.showMessageFor("projects");
                  forceUpdate((prev) => prev + 1);
                }}
              >
                <div
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all "bg-[#009ca6] border-[#009ca6]" : "border-[#d5dadd] bg-white"}`}
                >
                  <Image
                    src="/assets/svgs/select.svg"
                    alt="✓"
                    width={11}
                    height={11}
                    className="invert brightness-0"
                  />
                </div>
                <span className={`font-titillium text-[15px] "text-[#009ca6] font-semibold" : "text-[#525f69]"}`}>
                  gffh
                </span>
                <div className="p-8 text-center text-[#95a3ab]">
                  No projects found
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4">
            <label
              htmlFor="title-input"
              className="font-titillium font-bold text-xl text-[#166470]">
              Project Owners
            </label>
            <div className="w-full bg-white border-b-2 border-[#009ca6] px-4 py-2.5 flex flex-col gap-1 focus-within:bg-[#009ca6]/[0.02]">
              <span className="font-titillium text-[13px] font-bold text-[#009ca6] uppercase">
                Owners
              </span>
              <input
                id="owners"
                name="owners"
                className="w-full border-none bg-transparent outline-none font-titillium font-semibold text-base text-[#525f69] placeholder:text-[#95a3ab] placeholder:font-normal"
                placeholder="Enter project owners"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <label
              htmlFor="title-input"
              className="font-titillium font-bold text-xl text-[#166470]"
            >
              Project Viewers
            </label>
            <div className="w-full bg-white border-b-2 border-[#009ca6] px-4 py-2.5 flex flex-col gap-1 focus-within:bg-[#009ca6]/[0.02]">
              <span className="font-titillium text-[13px] font-bold text-[#009ca6] uppercase">
                Viewers
              </span>
              <input
                id="viewers"
                name="viewers"
                className="w-full border-none bg-transparent outline-none font-titillium font-semibold text-base text-[#525f69] placeholder:text-[#95a3ab] placeholder:font-normal"
                placeholder="Enter project viewers"
              />
            </div>

          </div>

          {/* Footer Actions */}
          <div className="w-full flex justify-end">
            <button
              disabled={isSubmitting}
              className={`w-full sm:w-[180px] h-14 md:h-[60px] bg-[#009ca6] rounded-xl border-none flex items-center justify-center gap-4 cursor-pointer hover:bg-[#008891] transition-all active:scale-[0.98] shadow-lg shadow-[#009ca6]/20 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              onClick={handleApply}
            >
              <span className="font-manrope font-bold text-xl md:text-[22px] text-white">
                {isSubmitting ? "Applying..." : "Apply"}
              </span>
              {isSubmitting ? (
                <Loader size="sm" />
              ) : (
                <Image
                  src="/assets/svgs/send.svg"
                  alt="Apply"
                  width={22}
                  height={22}
                  className="invert brightness-0"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProjectModal;
