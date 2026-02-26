
"use server";
import { fetchGraphQLQuery } from "../..";
import { GET_RNA_SEQUENCES_QUERY } from "./query";
import { GetSequencesResponse, GetSequencesInput } from "@/types/sequences";


export const getSequencesAction = async (input: GetSequencesInput) => {
    try {
        const response = await fetchGraphQLQuery<
            { getRnaSequences: GetSequencesResponse },
            { input: GetSequencesInput }>(
                GET_RNA_SEQUENCES_QUERY,
                { input }
            );
        return response.getRnaSequences;
    } catch (error) {
        console.error("Error fetching payment history:", error);
        throw error;
    }
};