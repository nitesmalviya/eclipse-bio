import { gql, DocumentNode } from "@apollo/client";

export const GET_ALL_ASSAY_TYPES_QUERY: DocumentNode = gql`
  query AssayTypes {
    assayTypes {
      success
      message
      data {
        active_status
        id
        name
      }
    }
  }
`;