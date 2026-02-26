"use server";
import { fetchGraphQLMutation } from "../..";
import { CREATE_CONTACT_US_MUTATION } from "./query";
import {
    CreateContactUsInput,
    CreateContactUsResponse,
} from "@/types/contact";

// create contact us action
export const createContactUsAction = async ({
    variables,
}: {
    variables: { input: CreateContactUsInput };
}): Promise<CreateContactUsResponse> => {
    const res = await fetchGraphQLMutation<CreateContactUsResponse>(
        CREATE_CONTACT_US_MUTATION,
        variables,
    );
    return res as CreateContactUsResponse;
};


