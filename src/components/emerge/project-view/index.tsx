"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Breadcrumb from "../../ui/breadcrumb/Breadcrumb";
import { useState, useMemo, useEffect } from "react";
import { PRIVATE_PATH } from "@/src/utils/constant";
import { Project } from "@/src/types/project";
import { debounce } from "@/src/utils/common-service";
import HeroSection from "../hero-section";
import SearchSection from "./search-section";
import ProjectTableSection from "./project-table-section";
import { getEmergeProjects } from "@/src/store/actions/emerge-action";
import AddNewSection from "./add-new-section";
import NewProjectModal from "./add-project-modal";

interface EMergeProjectViewProps {
    projects: Project[] | null;
    initialSearch?: string;
}

const EMergeProjectView = ({
    projects,
    initialSearch = "",
}: EMergeProjectViewProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [loading, setLoading] = useState(false);
    const [projectList, setProjectList] = useState<Project[] | null>(projects);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Update projectList when projects prop changes
    useEffect(() => {
        setProjectList(projects);
    }, [projects]);

    // Sync searchQuery with initialSearch
    useEffect(() => {
        setSearchQuery(initialSearch);
    }, [initialSearch]);

    const debouncedSearch = useMemo(
        () =>
            debounce(async (query: string) => {
                setLoading(true);
                try {
                    const res = await getEmergeProjects({
                        search: query,
                    });
                    setProjectList(res.data?.data || null);
                } finally {
                    setLoading(false);
                }
            }, 500),
        [searchParams],
    );

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const handleRowClick = (id: string) => {
        router.push(`${PRIVATE_PATH.EMERGE_PROJECT_VIEW}/${id}`);
    };


         // Handle add project
      const handleAddProject = async (newProject: any) => {
        console.log("New Project Data:", newProject);
        debugger;
        setIsModalOpen(false);
        
      };

    return (
        <div className="flex w-full min-h-screen bg-white font-titillium">
            <div className="flex-1 flex flex-col">
                {/* Breadcrumbs */}
                <div className="px-4 md:px-12 py-4">
                    <Breadcrumb
                        items={[
                            { label: "eMERGE Home", href: PRIVATE_PATH.EMERGE_HOME },
                            { label: "eMERGE Project View", isActive: true },
                        ]}
                        onBack={() => router.back()}
                    />
                </div>

                <HeroSection />
                <div className="px-4 md:px-12 lg:px-20">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                        <h2 className="font-titillium font-semibold text-2xl md:text-[28px] text-[#166470] m-0 leading-[120%]">
                            Projects
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full lg:w-auto">
                            {/* Search */}
                            <div className="flex-1 lg:flex-none">
                                <SearchSection
                                    searchQuery={searchQuery}
                                    handleSearch={handleSearch}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 sm:flex-none">
                                    <AddNewSection setIsModalOpen={setIsModalOpen} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Table Section */}
                        <ProjectTableSection
                            projects={projectList}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            handleRowClick={handleRowClick}
                            loading={loading}
                        />
                    </div>
                </div>
                <NewProjectModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleAddProject}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default EMergeProjectView;
