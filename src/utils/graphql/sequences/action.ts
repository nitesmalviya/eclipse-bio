
"use server";
import { fetchGraphQLMutation } from "../..";
import { GET_RNA_SEQUENCES_QUERY } from "./query";
import { GetSequencesResponse, GetSequencesInput } from "@/src/types/sequences";

export const getSequencesAction = async ({
    variables,
}: {
    variables: GetSequencesInput;
}): Promise<GetSequencesResponse> => {
    const res = await fetchGraphQLMutation<GetSequencesResponse>(
        GET_RNA_SEQUENCES_QUERY,
        { ...variables },
    );
    return res as GetSequencesResponse;
};