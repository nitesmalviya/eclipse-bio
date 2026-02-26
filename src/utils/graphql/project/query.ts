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