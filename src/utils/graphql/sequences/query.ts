import { gql, DocumentNode } from "@apollo/client";

// Data sets query
export const GET_RNA_SEQUENCES_QUERY: DocumentNode = gql`

query GetRnaSequences {
  getRnaSequences {
    success
    message
    data {
      id
      created_by_user_id
      name
      description
      rna_type
      source
      status
      validation_results
      is_optimized
      optimized_at
      optimization_results
      active_status
      created_at
      updated_at
      deleted_at
      full_sequence
    }
    total
    page
    limit
    totalPages
  }
}
  `