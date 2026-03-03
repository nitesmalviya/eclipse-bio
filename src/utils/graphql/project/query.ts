import { gql, DocumentNode } from "@apollo/client";

//create project mutation
export const CREATE_PROJECT_MUTATION: DocumentNode = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      data {
        id
        identifier
        name
        owner {
          display_name
        }
      }
    }
  }
`;

//projects query
export const GET_PROJECTS_QUERY: DocumentNode = gql`
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