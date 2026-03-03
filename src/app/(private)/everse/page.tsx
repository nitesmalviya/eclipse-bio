import EverseHome from "@/components/everse";
import { getAllProjects } from "@/store/actions/home-action";
import { getProjectsAction } from "@/utils/graphql/project/action";

const eversePage = async () => {
    const res = await getAllProjects({ });
    const projectsData = res?.data;

    return (
        <EverseHome projectsData={projectsData} />
    )
}

export default eversePage;