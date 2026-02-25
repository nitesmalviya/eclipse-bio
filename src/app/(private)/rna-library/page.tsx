import RNALibrary from "@/src/components/rna-library";
import { getSequencesAction } from "@/src/utils/graphql/sequences/action";

const RNALibraryPage = async () => {
    const res = await getSequencesAction({
        variables: {
            limit: 10,
            offset: 0,
        }
    });
    const rnaSequences = res?.getRnaSequences?.data ?? [];

    return (
        <RNALibrary rnaSequences={rnaSequences} />
    )
}


export default RNALibraryPage;