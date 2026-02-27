import EmergeHome from '@/components/emerge/home';
import { getEmergeComparisons, getEmergeProjects } from '@/store/actions/emerge-action';
import { DASHBOARD_ITEMS_LIMIT } from '@/utils/constant';

const EmergePage = async () => {
    //projects
    const projects = await getEmergeProjects({ limit: DASHBOARD_ITEMS_LIMIT });
    //comparisons
    const comparisons = await getEmergeComparisons({
        limit: DASHBOARD_ITEMS_LIMIT,
    });

    return (
        <EmergeHome
            projects={projects?.data?.data || null}
            comparisons={comparisons?.data?.data || null} />
    )
}

export default EmergePage;
