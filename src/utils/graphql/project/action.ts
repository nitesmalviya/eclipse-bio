"use server";

import { CreateProjectInput, CreateProjectResponse, ProjectsInput, ProjectsResponse } from "@/types/project";
import { fetchGraphQLMutation } from "../../";
import { CREATE_PROJECT_MUTATION, GET_PROJECTS_QUERY } from "./query";

export const createProjectAction = async ({
  variables,
}: {
  variables: { input: CreateProjectInput };
}) => {
  const res = await fetchGraphQLMutation<CreateProjectResponse>(
    CREATE_PROJECT_MUTATION,
    variables,
  );
  return res as CreateProjectResponse;
};


// get all everse projects action
export const getProjectsAction = async ({
  variables,
}: {
  variables: { filter: ProjectsInput };
}): Promise<ProjectsResponse> => {
  const res = await fetchGraphQLMutation<ProjectsResponse>(
    GET_PROJECTS_QUERY,
    variables,
  );
  return res as ProjectsResponse;
};