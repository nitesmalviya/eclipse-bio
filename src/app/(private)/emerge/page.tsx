import EmergeHome from '@/src/components/emerge/home';
import { DASHBOARD_ITEMS_LIMIT } from '@/src/utils/constant';
import { getEmergeComparisonsAction, getEmergeProjectsAction } from '@/src/utils/graphql/emerge/action';

const EmergePage = async () => {
    const res = await getEmergeProjectsAction({ variables: { filter: { limit: DASHBOARD_ITEMS_LIMIT } } });
    const projects = res?.projects; 
    const comparisonsRes = await getEmergeComparisonsAction({variables: { filter: { limit: DASHBOARD_ITEMS_LIMIT } }});
    const comparisons = comparisonsRes?.comparisons?.data ?? [];
    
     
    return (
        <EmergeHome 
            projects={projects}
            comparisons={comparisons}/>
    )
}

export default EmergePage;
