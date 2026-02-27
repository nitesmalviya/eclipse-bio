
"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "../..";
import { CREATE_RNA_SEQUENCE_MUTATION, GET_RNA_SEQUENCES_QUERY } from "./query";
import { GetSequencesResponse, GetSequencesInput, CreateRnaSequenceInput, CreateRnaSequenceResponse } from "@/types/sequences";


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

export const createRnaSequenceAction = async ({
    variables,
}: {
    variables: { input: CreateRnaSequenceInput };
}) => {
    const res = await fetchGraphQLMutation<CreateRnaSequenceResponse>(
        CREATE_RNA_SEQUENCE_MUTATION,
        variables,
    );
    return res as CreateRnaSequenceResponse;
};