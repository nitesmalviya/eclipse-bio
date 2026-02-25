import { gql, DocumentNode } from "@apollo/client";

export const CREATE_CONTACT_US_MUTATION: DocumentNode = gql`
mutation ContactUs($input: CreateContactUsInput!) {
    contactUs(input: $input) {
        success
        message
    data {
            id
            first_name
            last_name
            email
            subject
            message
            created_at
            updated_at
        }
    }
}`