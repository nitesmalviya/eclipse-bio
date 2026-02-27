import { gql, DocumentNode } from "@apollo/client";

export const GET_EMERGE_PROJECTS_QUERY: DocumentNode = gql`
  query Projects($filter: ProjectFilter) {
    projects(filter: $filter) {
      message
      success
      data {
        id
        name
        active_status
        identifier
        start_date
        status
        progress_percentage
        target_end_date
        actual_end_date
        owner {
          display_name
        }
      }
    }
  }
`;

export const GET_EMERGE_COMPARISON_LISTS_QUERY: DocumentNode = gql`
  query Comparisons($filter: ComparisonFilter) {
    comparisons(filter: $filter) {
      message
      success
      limit
      page
      total
      totalPages
      data {
        assay_type_id
        comparison_end_date
        comparison_start_date
        id
        title
        projects_count
      }
    }
  }
`;

