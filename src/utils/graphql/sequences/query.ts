import { gql, DocumentNode } from "@apollo/client";

// Data sets query
export const GET_RNA_SEQUENCES_QUERY: DocumentNode = gql`
query GetRnaSequences($input: GetRnaSequencesInput) {
  getRnaSequences(input: $input) {
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

export const CREATE_RNA_SEQUENCE_MUTATION: DocumentNode = gql`
  mutation CreateRnaSequence($input: CreateRnaSequenceInput!) {
  createRnaSequence(input: $input) {
    message
    success
    data {
      annotations {
        id
        created_at
        active_status
      }
      created_at
      active_status
      description
      name
      rna_type
    }
  }
} `