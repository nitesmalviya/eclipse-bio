import HeroSection from "./hero-section";
import ProjectCards from "./Project-cards";

const EverseHome = () => {
    return (
        <div className="w-full">
            <HeroSection />
            <ProjectCards />
            <div className="w-full px-4 md:px-12 lg:px-20 pb-4"></div>
        </div>
    )
}


export default EverseHome;