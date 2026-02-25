"use client";
import { useState } from "react";
import {
    EMERGE_COMPARISON_TABS,
    EMERGE_PROJECT_TABS,
    PRIVATE_PATH,
} from "@/src/utils/constant";
import HeroSection from "../hero-section";
import ProjectTable from "../project-table";
import ComparisonTable from "../comparison-table";
import TableSection from "../table-section";
import { Project } from "@/src/types/project";
import { Comparisons } from "@/src/types/comparison-list";


interface EMergeHomeComponentProps {
    projects: Project[] | null;
    comparisons: Comparisons[] | null;
}

const EmergeHome = ({ projects, comparisons }: EMergeHomeComponentProps) => {
    const [activeProjectTab, setActiveProjectTab] = useState(0);
    const [activeComparisonTab, setActiveComparisonTab] = useState(0);

    return (
        <div className="flex w-full min-h-screen bg-white font-titillium">
            <div className="w-full">
                <HeroSection />
                <div className="px-4 md:px-12 lg:px-20 py-8 md:py-10">
                    <TableSection
                        title="Featured projects"
                        buttonText="See all projects"
                        buttonPath={PRIVATE_PATH.EMERGE_PROJECT_VIEW}
                        tabs={EMERGE_PROJECT_TABS}
                        activeTab={activeProjectTab}
                        setActiveTab={setActiveProjectTab}
                    >
                        <ProjectTable projects={projects} activeTab={activeProjectTab} />
                    </TableSection>
                    {/* Comparison Lists Section */}
                    <TableSection
                        title="Comparison lists"
                        buttonText="See all comparisons"
                        buttonPath={PRIVATE_PATH.EMERGE_COMPARISON_LISTS}
                        tabs={EMERGE_COMPARISON_TABS}
                        activeTab={activeComparisonTab}
                        setActiveTab={setActiveComparisonTab}
                    >
                        <ComparisonTable
                            comparisons={comparisons}
                            activeTab={activeComparisonTab}
                        />
                    </TableSection>

                </div>
            </div>
        </div >
    );
};

export default EmergeHome;
