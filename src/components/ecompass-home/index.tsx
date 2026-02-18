"use client";

import HeroSection from "./hero-section";
import StatsCard from "./stats-card";
import TableCard from "./table-projects-card";
import TableDataSetsCard from "./table-datasets-card";

export interface DatasetType {
    assay_type: string;
    id: string;
    name: string;
}

export interface ProjectType {
    id: string;
    name: string;
    slug?: string;
    description?: string | null;
    status?: string;
    start_date?: string | null;
    target_end_date?: string | null;
    actual_end_date?: string | null;
    identifier?: string;
    progress_percentage?: number;
    settings?: Record<string, any> | null;
    tags?: string[] | null;
    is_public?: boolean;
    is_featured?: boolean;
    active_status?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    assay_type?: string;

}


export interface GetFeaturedDatasetsResponse {
    datasets: DatasetType[];
}
export interface GetProjectsDataResponse {
    message: string;
    success: boolean;
    activeCount: number;
    total: number;
    data: ProjectType[];
}

interface Props {
    featureDataSets: GetFeaturedDatasetsResponse;
    projectsData: GetProjectsDataResponse;
}

const EcompassHome = ({ featureDataSets, projectsData }: Props) => {
    const datasetsList = featureDataSets?.datasets ?? [];
    const projectsList = projectsData?.data ?? [];


    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <HeroSection />
            <div className="space-y-[60px] px-6 md:px-[70px] py-10 md:py-[60px]">
                <div className="w-full lg:min-h-[600px] rounded-3xl bg-white shadow-[0_4px_20px_0_rgba(84,110,116,0.12)] p-6 md:p-10 flex flex-col lg:flex-row gap-10">
                    <StatsCard projectsData={projectsData} />
                    <TableCard projectsList={projectsList} />
                </div>
                <div className="w-full lg:min-h-[600px] rounded-3xl bg-white shadow-[0_4px_20px_0_rgba(84,110,116,0.12)] p-6 md:p-10 flex flex-col lg:flex-row gap-10">
                    <StatsCard projectsData={projectsData} />
                    <TableDataSetsCard datasetsList={datasetsList} />
                </div>
            </div>
            {/* Floating action button */}
            <button className="fixed right-4 sm:right-6 bottom-6 sm:bottom-8 bg-[#009CA6] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg hover:opacity-90 transition text-sm font-semibold">
                Learn more
            </button>
        </div >
    );
};

export default EcompassHome;
