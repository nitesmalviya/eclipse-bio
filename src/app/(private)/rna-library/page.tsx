import RNALibrary from "@/components/rna-library";
import { DEFAULT_PAGINATION } from "@/types/sequences";
import { SORT_ORDER } from "@/utils/constant";
import { getSequencesAction } from "@/utils/graphql/sequences/action";

const RNALibraryPage = async () => {

    const res = await getSequencesAction({
        page: DEFAULT_PAGINATION.page,
        limit: DEFAULT_PAGINATION.limit,
        search: null,
        sort: SORT_ORDER.DESC,
        sortBy: "date",
    })

    return (
        <RNALibrary rnaSequences={res} />
    )
}


export default RNALibraryPage;