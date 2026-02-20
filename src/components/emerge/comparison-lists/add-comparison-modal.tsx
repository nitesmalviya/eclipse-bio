"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Calendar from "../../ui/calendar/Calendar";
import { getAllAssayTypes } from "@/src/store/actions/assay-type-action";
import { AssayType } from "@/src/types/assay-type";
import { getEmergeProjects } from "@/src/store/actions/emerge-action";
import { Project } from "@/src/types/project";
import { debounce, formatToUTCISO } from "@/src/utils/common-service";
import SimpleReactValidator from "simple-react-validator";
import Loader from "../../ui/loader";

interface NewComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (comparison: any) => void;
  loading?: boolean;
}

const NewComparisonModal: React.FC<NewComparisonModalProps> = ({
  isOpen,
  onClose,
  onSave,
  loading: isSubmitting = false,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comparisonStartDate, setComparisonStartDate] = useState<Date | null>(
    null,
  );
  const [comparisonEndDate, setComparisonEndDate] = useState<Date | null>(null);
  const [assayTypes, setAssayTypes] = useState<AssayType[]>([]);
  const [selectedAssayType, setSelectedAssayType] = useState<AssayType | null>(
    null,
  );
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  console.log(selectedProjects,"selectedProjectsselectedProjects")
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState({
    assays: false,
    projects: false,
  });

  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [showAssayDropdown, setShowAssayDropdown] = useState(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);

  const assayDropdownRef = useRef<HTMLDivElement>(null);
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const [, forceUpdate] = useState(0);

  const validatorRef = useRef(
    new SimpleReactValidator({
      className: "text-[13px] font-semibold text-[#F4364C] mt-1",
    }),
  );

  const validator = validatorRef.current;

  // Fetch assay types
  const fetchAssayTypes = async () => {
    setLoading((prev) => ({ ...prev, assays: true }));
    try {
      const res = await getAllAssayTypes();
      if (res.success) {
        setAssayTypes(res?.data?.data || []);
      }
    } finally {
      setLoading((prev) => ({ ...prev, assays: false }));
    }
  };

  // Fetch projects from API
  const fetchProjects = async (query: string) => {
    
    setLoading((prev) => ({ ...prev, projects: true }));
    try {
      const res = await getEmergeProjects({ search: query });
      console.log(res, "Response")
      if (res.success) {
        setProjectList(res?.data?.data || []);
      }
    } finally {
      setLoading((prev) => ({ ...prev, projects: false }));
    }
  };

  const debouncedFetchProjects = useMemo(
    () => debounce((query: string) => fetchProjects(query), 500),
    [],
  );

  // Fetch data on open
  useEffect(() => {
    if (isOpen) {
      fetchAssayTypes();
      fetchProjects("");
    }
  }, [isOpen]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        assayDropdownRef.current &&
        !assayDropdownRef.current.contains(event.target as Node)
      ) {
        setShowAssayDropdown(false);
      }
      if (
        projectDropdownRef.current &&
        !projectDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProjectDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Format date to DD/MM/YYYY
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Handle assay select
  const handleAssaySelect = (assay: AssayType) => {
    setSelectedAssayType(assay);
    setShowAssayDropdown(false);
  };

  // Handle project toggle
  const handleProjectToggle = (project: Project) => {
    setSelectedProjects((prev) =>
      prev.some((p) => p.id === project.id)
        ? prev.filter((p) => p.id !== project.id)
        : [...prev, project],
    );
  };

  // Handle remove project
  const handleRemoveProject = (projectId: string) => {
    setSelectedProjects((prev) => {
      const newList = prev.filter((p) => p.id !== projectId);
      validator.showMessageFor("projects");
      forceUpdate((prevForce) => prevForce + 1);
      return newList;
    });
  };

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetchProjects(query);
  };

  // Handle apply/submit
  const handleApply = () => {
    if (validator.allValid()) {
      debugger
      const payload = {
        title,
        description,
        comparisonStartDate: formatToUTCISO(comparisonStartDate),
        comparisonEndDate: formatToUTCISO(comparisonEndDate),
        assayTypeId: selectedAssayType?.id,
        projectIds: selectedProjects.map((p) => p.id),
      };
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
              New comparison
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

        {/* Title Input */}
        <div className="w-full flex flex-col gap-4">
          <label
            htmlFor="title-input"
            className="font-titillium font-bold text-xl text-[#166470]"
          >
            Enter Comparison Title
          </label>
          <div className="w-full bg-white border-b-2 border-[#009ca6] px-4 py-2.5 flex flex-col gap-1 focus-within:bg-[#009ca6]/[0.02]">
            <span className="font-titillium text-[13px] font-bold text-[#009ca6] uppercase">
              Comparison Title
            </span>
            <input
              id="title-input"
              className="w-full border-none bg-transparent outline-none font-titillium font-semibold text-base text-[#525f69] placeholder:text-[#95a3ab] placeholder:font-normal"
              placeholder="Enter comparison title"
              value={title}
              onBlur={() => validator.showMessageFor("title")}
              onChange={(e) => {
                setTitle(e.target.value);
                validator.showMessageFor("title");
              }}
            />
          </div>
          {validator.message("title", title, "required|min:5")}
        </div>

        {/* Description Input */}
        <div className="w-full flex flex-col gap-4">
          <label
            htmlFor="description-input"
            className="font-titillium font-bold text-xl text-[#166470]"
          >
            Enter Comparison Description
          </label>
          <div className="w-full bg-white border-b-2 border-[#009ca6] px-4 py-2.5 flex flex-col gap-1 focus-within:bg-[#009ca6]/[0.02]">
            <span className="font-titillium text-[13px] font-bold text-[#009ca6] uppercase">
              Description
            </span>
            <textarea
              id="description-input"
              className="w-full border-none bg-transparent outline-none font-titillium font-semibold text-base text-[#525f69] placeholder:text-[#95a3ab] placeholder:font-normal"
              placeholder="Enter comparison details..."
              value={description}
              rows={3}
              onBlur={() => validator.showMessageFor("description")}
              onChange={(e) => {
                setDescription(e.target.value);
                validator.showMessageFor("description");
              }}
            />
          </div>
          {validator.message("description", description, "required|min:5")}
        </div>

        {/* Date Range Selection */}
        <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-4">
          <div className="flex-1 flex flex-col gap-4 relative">
            <label
              htmlFor="start-date"
              className="font-titillium font-bold text-lg md:text-xl text-[#166470]"
            >
              Select Date Range
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
                  value={formatDate(comparisonStartDate)}
                  readOnly
                />
              </div>
              {showStartCalendar && (
                <div className="absolute top-[calc(100%+8px)] left-0 z-100">
                  <Calendar
                    selectedDate={comparisonStartDate}
                    onDateSelect={(date) => {
                      setComparisonStartDate(date);
                      setShowStartCalendar(false);
                      validator.showMessageFor("startDate");
                      forceUpdate((prev) => prev + 1);
                    }}
                    onCancel={() => setShowStartCalendar(false)}
                    onNext={() => setShowStartCalendar(false)}
                    maxDate={comparisonEndDate || undefined}
                    startDate={comparisonStartDate}
                    endDate={comparisonEndDate}
                  />
                </div>
              )}
            </div>
            {validator.message("startDate", comparisonStartDate, "required")}
          </div>
          <div className="flex-1 flex flex-col gap-4 relative">
            <label
              htmlFor="end-date"
              className="font-titillium font-bold text-xl text-[#166470] hidden sm:block invisible"
            >
              End Date
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
                  value={formatDate(comparisonEndDate)}
                  readOnly
                />
              </div>
              {showEndCalendar && (
                <div className="absolute top-[calc(100%+8px)] left-0 z-100">
                  <Calendar
                    selectedDate={comparisonEndDate}
                    onDateSelect={(date) => {
                      setComparisonEndDate(date);
                      setShowEndCalendar(false);
                      validator.showMessageFor("endDate");
                      forceUpdate((prev) => prev + 1);
                    }}
                    onCancel={() => setShowEndCalendar(false)}
                    onNext={() => setShowEndCalendar(false)}
                    minDate={comparisonStartDate || undefined}
                    startDate={comparisonStartDate}
                    endDate={comparisonEndDate}
                  />
                </div>
              )}
            </div>
            {validator.message("endDate", comparisonEndDate, "required")}
          </div>
        </div>

        {/* Assay Type Selection */}
        <div className="w-full flex flex-col gap-4">
          <label
            htmlFor="assay-button"
            className="font-titillium font-bold text-xl text-[#166470]"
          >
            Select Assay Type
          </label>
          <div className="relative" ref={assayDropdownRef}>
            <div
              id="assay-button"
              className="w-full bg-white border-b-2 border-[#009ca6] px-4 py-2.5 flex items-center justify-between cursor-pointer"
              onClick={() => {
                setShowAssayDropdown(!showAssayDropdown);
                setShowEndCalendar(false);
                setShowStartCalendar(false);
                setShowProjectDropdown(false);
              }}
            >
              <div className="flex flex-col gap-1 w-full overflow-hidden">
                <span className="font-titillium text-[13px] font-bold text-[#009ca6] uppercase">
                  Type of assay
                </span>
                <span className="font-titillium font-semibold text-base text-[#525f69] truncate">
                  {selectedAssayType?.name || "Select assay type"}
                </span>
              </div>
              <Image
                src="/assets/svgs/arrow-down.svg"
                alt="Select"
                width={20}
                height={20}
                className={`transition-transform duration-200 ${showAssayDropdown ? "rotate-180" : ""}`}
              />
            </div>
            {showAssayDropdown && (
              <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white rounded-lg shadow-lg max-h-64 overflow-y-auto z-100 border border-[#f0f2f4] custom-scrollbar">
                {loading.assays ? (
                  <div className="p-4 flex justify-center">
                    <Loader size="sm" />
                  </div>
                ) : assayTypes.length > 0 ? (
                  assayTypes.map((assay) => (
                    <div
                      key={assay.id}
                      className={`px-4 py-3 font-titillium text-[15px] cursor-pointer hover:bg-[#009ca6]/5 transition-colors ${selectedAssayType?.id === assay.id ? "bg-[#009ca6]/10 text-[#009ca6] font-semibold" : "text-[#525f69]"}`}
                      onClick={() => {
                        handleAssaySelect(assay);
                        validator.showMessageFor("assayType");
                        forceUpdate((prev) => prev + 1);
                      }}
                    >
                      {assay.name}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-[#95a3ab]">
                    No assay types found
                  </div>
                )}
              </div>
            )}
          </div>
          {validator.message("assayType", selectedAssayType, "required")}
        </div>

        {/* Project Selection with API Search */}
        <div className="w-full flex flex-col gap-4">
          <label
            htmlFor="project-search"
            className="font-titillium font-bold text-xl text-[#166470]"
          >
            Select Projects to Compare
          </label>
          <div className="relative" ref={projectDropdownRef}>
            <div className="w-full min-h-14 bg-white border-b-2 border-[#009ca6] px-4 py-2.5 flex flex-col gap-2">
              <span className="font-titillium text-[13px] font-bold text-[#009ca6] uppercase">
                Projects
              </span>
              <div className="flex flex-wrap gap-2 items-center">
                {selectedProjects?.map((p) => (
                  <div
                    key={p.id}
                    className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 bg-[#f0f2f4]/80 border border-[#d5dadd] rounded-lg font-titillium font-semibold text-[13px] text-[#525f69]"
                  >
                    <span>
                      {p?.name?.length > 25
                        ? `${p?.name?.substring(0, 22)}...`
                        : p?.name}
                    </span>
                    <button
                      className="bg-transparent border-none p-0 opacity-60 hover:opacity-100 cursor-pointer"
                      onClick={() => handleRemoveProject(p.id)}
                    >
                      <Image
                        src="/assets/svgs/close-circle.svg"
                        alt="X"
                        width={14}
                        height={14}
                      />
                    </button>
                  </div>
                ))}
                <div className="flex-1 flex items-center gap-2 min-w-[120px]">
                  {selectedProjects.length === 0 && (
                    <Image
                      src="/assets/svgs/search-normal.svg"
                      alt="S"
                      width={18}
                      height={18}
                      className="opacity-40"
                    />
                  )}
                  <input
                    id="project-search"
                    className="w-full border-none bg-transparent outline-none font-titillium text-base text-[#525f69] placeholder:text-[#95a3ab]"
                    placeholder={
                      selectedProjects.length === 0 ? "Search projects" : ""
                    }
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => {
                      setShowProjectDropdown(true);
                      setShowEndCalendar(false);
                      setShowStartCalendar(false);
                      setShowAssayDropdown(false);
                    }}
                  />
                </div>
              </div>
            </div>
            {showProjectDropdown && (
              <div className="  absolute top-[calc(100%+4px)] left-0 right-0 bg-white rounded-lg shadow-lg h-[250px] overflow-y-auto z-100 border border-[#f0f2f4] custom-scrollbar">
                {loading.projects ? (
                  <div className="p-8 flex justify-center">
                    <Loader size="md" />
                  </div>
                ) : projectList.length > 0 ? (
                  projectList.map((project) => (
                    <div
                      key={project.id}
                      className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-[#009ca6]/5 border-b last:border-0 border-[#f0f2f4]"
                      onClick={() => {
                        handleProjectToggle(project);
                        validator.showMessageFor("projects");
                        forceUpdate((prev) => prev + 1);
                      }}
                    >
                      <div
                        className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${selectedProjects.some((p) => p.id === project.id) ? "bg-[#009ca6] border-[#009ca6]" : "border-[#d5dadd] bg-white"}`}
                      >
                        {selectedProjects.some((p) => p.id === project.id) && (
                          <Image
                            src="/assets/svgs/select.svg"
                            alt="✓"
                            width={11}
                            height={11}
                            className="invert brightness-0"
                          />
                        )}
                      </div>
                      <span
                        className={`font-titillium text-[15px] ${selectedProjects.some((p) => p.id === project.id) ? "text-[#009ca6] font-semibold" : "text-[#525f69]"}`}
                      >
                        {project.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-[#95a3ab]">
                    No projects found
                  </div>
                )}
              </div>
            )}
          </div>
          {validator.message("projects", selectedProjects, "required")}
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
  );
};

export default NewComparisonModal;
