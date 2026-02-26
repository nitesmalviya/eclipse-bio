import EcompassHomeComponent from "@/components/ecompass-home";
import {
  getAllProjects,
  getFeaturedDatasets,
} from "@/store/actions/home-action";
import { DASHBOARD_ITEMS_LIMIT } from "@/utils/constant";

const Home = async () => {
  //projects
  const projects = await getAllProjects({ limit: DASHBOARD_ITEMS_LIMIT });
  //datasets
  const datasets = await getFeaturedDatasets({ limit: DASHBOARD_ITEMS_LIMIT });
  return (
    <EcompassHomeComponent
      datasets={datasets.data || null}
      projects={projects.data || null}
    />
  );
};

export default Home;
