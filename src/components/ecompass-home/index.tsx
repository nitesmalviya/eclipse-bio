"use client";
import { PRIVATE_PATH } from "@/src/utils/constant";
import HeroSection from "./hero-section";
import StatsCard from "./stats-card";
import TableSection from "./table-section";
import { FeaturedDatasetData } from "@/src/types/dataset";
import { ProjectData } from "@/src/types/project";

interface EcompassHomeComponentProps {
    readonly projects: ProjectData | null;
    readonly datasets: FeaturedDatasetData | null;
}

const EcompassHomeComponent = ({ projects, datasets }: EcompassHomeComponentProps) => {
    const CARDS = {
        EMERGE: {
            id: 1,
            TITLE: "eMERGE",
            DESCRIPTION:
                "A full-service partnership platform for RNA therapy characterization and optimization.",
            STATS: [
                {
                    id: 1,
                    label: "Total projects:",
                    value: projects?.total ?? 0,
                    iconPath: "/assets/images/Frame87.png",
                },
                {
                    id: 2,
                    label: "Active projects:",
                    value: projects?.activeCount ?? 0,
                    iconPath: "/assets/images/Frame88.png",
                },
            ],
            BUTTON_TEXT: "See eMERGE projects",
            BUTTON_LINK: PRIVATE_PATH.EMERGE_HOME,
            TABLE_TITLE: "Featured projects",
            LOGO_IMAGE: "/assets/images/eMerge_Layer_1.png",

        },
        EVERSE: {
            id: 2,
            TITLE: "eVERSE",
            DESCRIPTION: "A data-generation platform for AI-driven drug discovery.",
            STATS: [
                {
                    id: 1,
                    label: "Non-exclusive datasets",
                    value: 0,
                    iconPath: "/assets/images/Frame87DS.png",
                },
                {
                    id: 2,
                    label: "Exclusive datasets",
                    value: 0,
                    iconPath: "/assets/images/Frame88DS(2).png",
                },
            ],
            BUTTON_TEXT: "See eVERSE projects",
            BUTTON_LINK: PRIVATE_PATH.EVERSE_HOME,
            TABLE_TITLE: "Featured datasets",
            LOGO_IMAGE: "/assets/images/eVerse_Layer_1.png",

        },
    };

    return (
        <div className="flex w-full min-h-screen font-titillium bg-[#F9FBFB]">
            <div className="flex-1 flex flex-col">
                {/* Main Content */}
                <main className="flex-1">
                    {/* Hero Section */}
                    <HeroSection />
                    {/* Cards Container */}
                    <div className="space-y-[60px] px-6 md:px-[80px] py-10 md:py-[60px]">
                        {/* Emerge */}
                        <article
                            key={CARDS.EMERGE.id}
                            className="w-full lg:min-h-[600px] rounded-3xl bg-white shadow-[0_4px_20px_0_rgba(84,110,116,0.12)] p-6 md:p-10 flex flex-col lg:flex-row gap-10"
                        >
                            {/* Left Part */}
                            <StatsCard
                                iconPath={CARDS?.EMERGE?.LOGO_IMAGE}
                                description={CARDS?.EMERGE?.DESCRIPTION}
                                buttonText={CARDS?.EMERGE?.BUTTON_TEXT}
                                buttonLink={CARDS?.EMERGE?.BUTTON_LINK}
                                stats={CARDS?.EMERGE?.STATS}
                            />
                            {/* Right Part - Table */}
                            <TableSection
                                tableTitle={CARDS?.EMERGE?.TABLE_TITLE}
                                tableData={projects?.data || []}
                            />
                        </article>
                        {/* EVERSE */}
                        <article
                            key={CARDS.EVERSE.id}
                            className="w-full lg:min-h-[600px] rounded-3xl bg-white shadow-[0_4px_20px_0_rgba(84,110,116,0.12)] p-6 md:p-10 flex flex-col lg:flex-row gap-10"
                        >
                            {/* Left Part */}
                            <StatsCard
                                iconPath={CARDS?.EVERSE?.LOGO_IMAGE}
                                description={CARDS?.EVERSE?.DESCRIPTION}
                                buttonText={CARDS?.EVERSE?.BUTTON_TEXT}
                                buttonLink={CARDS?.EVERSE?.BUTTON_LINK}
                                stats={CARDS?.EVERSE?.STATS}
                            />
                            {/* Right Part - Table */}
                            <TableSection
                                tableTitle={CARDS?.EVERSE?.TABLE_TITLE}
                                tableData={datasets?.datasets || []}
                            />
                        </article>
                    </div>
                </main>
            </div>
        </div>
    );
};



export default EcompassHomeComponent;