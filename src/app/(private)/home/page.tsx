import EcompassHome from '@/src/components/ecompass-home'
import { DASHBOARD_ITEMS_LIMIT } from '@/src/utils/constant';
import { getAllProjectsAction, getFeaturedDatasetsAction } from '@/src/utils/graphql/home/action';

const EcompassHomePage = async () => {
    // for feature data sets
    const res = await getFeaturedDatasetsAction({ variables: { limit: DASHBOARD_ITEMS_LIMIT } });
    const featureDataSets = res?.getFeaturedDatasets;
    const projectsRes = await getAllProjectsAction({});
    const projectsData = projectsRes?.projects; 
    
    return (
        <EcompassHome 
            featureDataSets={featureDataSets} projectsData={projectsData}/>
    )
}

export default EcompassHomePage;
