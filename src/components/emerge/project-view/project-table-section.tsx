"use client";
import ProjectTable from "../project-table";
import TableSection from "../table-section";
import { EMERGE_PROJECT_TABS } from "@/src/utils/constant";
import Loader from "../../ui/loader";
import { Project } from "@/src/types/project";

interface ProjectTableSectionProps {
  readonly projects: Project[] | null;
  readonly activeTab: number;
  readonly setActiveTab: (value: number) => void;
  readonly handleRowClick?: (id: string) => void;
  readonly loading: boolean;
}

export default function ProjectTableSection({
  projects,
  activeTab,
  setActiveTab,
  handleRowClick,
  loading,
}: ProjectTableSectionProps) {
  return (
    <TableSection
      title=""
      buttonText=""
      buttonPath=""
      tabs={EMERGE_PROJECT_TABS}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader size="md" />
        </div>
      ) : (
        <ProjectTable
          projects={projects}
          activeTab={activeTab}
          onRowClick={handleRowClick}
        />
      )}
    </TableSection>
  );
}
