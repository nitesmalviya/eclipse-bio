import HeroSection from "./hero-section";
import ProjectCards from "./Project-cards";

interface Assay {
    name: string;
}

interface Project {
    id: string;
    name: string;
    enum: string;
    active_status: boolean;
    created_at: string;
    assays: Assay[];
}

interface EverseHomeProps {
    projectsData: Project[];
}

const EverseHome = ({ projectsData }: EverseHomeProps) => {
    return (
        <div className="w-full">
            <HeroSection />
            <ProjectCards projectsData={projectsData} />
            <div className="w-full px-4 md:px-12 lg:px-20 pb-4"></div>
        </div>
    )
}


export default EverseHome;