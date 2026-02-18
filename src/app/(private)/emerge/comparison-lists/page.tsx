import ComparisonLists from '@/src/components/emerge/comparison-lists';
import { PAGINATION_LIMIT } from '@/src/utils/constant';
import { getEmergeComparisonsAction } from '@/src/utils/graphql/emerge/action';


const EMergeComparisonListsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{search?: string}>;

}) => {
  const {search} = await searchParams;
  const comparisonsRes = await getEmergeComparisonsAction({
    variables: {
      filter: {
        limit: PAGINATION_LIMIT.LIMIT,
        page: PAGINATION_LIMIT.PAGE,
        search: search || ""
      }
    }
  });
  const comparisons = comparisonsRes?.comparisons?.data ?? [];
  return (
    <ComparisonLists 
      comparisons={comparisons} 
      initialSearch={search || ""}/>
  )
}

export default EMergeComparisonListsPage;
