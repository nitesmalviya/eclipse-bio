import { gql, DocumentNode } from "@apollo/client";

//create comparison mutation
export const CREATE_COMPARISON_MUTATION: DocumentNode = gql`
  mutation CreateComparison($input: CreateComparisonInput!) {
    createComparison(input: $input) {
      success
      message
      data {
        active_status
        assay_type_id
        comparison_end_date
        comparison_start_date
        id
        title
      }
    }
  }
`;



