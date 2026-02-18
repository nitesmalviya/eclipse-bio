import { gql, DocumentNode } from "@apollo/client";

// Data sets query
export const GET_FEATURED_DATASETS_QUERY: DocumentNode = gql`
query GetFeaturedDatasets($limit: Float, $offset: Float) {
  getFeaturedDatasets(limit: $limit, offset: $offset) {
    success
    message
    datasets {
      assay_type
      name
    }
    total
  }
}
`;


// Projects query
export const GET_ALL_PROJECTS_QUERY: DocumentNode = gql`
  query Projects($filter: ProjectFilter) {
    projects(filter: $filter) {
      message
      success
      activeCount
      total
      data {
        id
        name
        active_status
        assays {
          name
        }
      }
    }
  }
`;


