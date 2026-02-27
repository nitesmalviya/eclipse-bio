"use server";
import { ComparisonListResponse, ComparisonsInput } from "@/types/comparison-list";
import { fetchGraphQLMutation } from "../..";
import { GET_EMERGE_COMPARISON_LISTS_QUERY, GET_EMERGE_PROJECTS_QUERY } from "./query";
import { ProjectsInput, ProjectsResponse } from "@/types/project";

/**
* Fetch projects from GraphQL API
*/
export const getEmergeProjectsAction = async ({
  variables,
}: {
  variables: { filter: ProjectsInput };
}): Promise<ProjectsResponse> => {
  const res = await fetchGraphQLMutation<ProjectsResponse>(
    GET_EMERGE_PROJECTS_QUERY,
    variables,
  );
  return res as ProjectsResponse;
};



/**
* Fetch projects from GraphQL API
*/
export const getEmergeComparisonsAction = async ({
  variables,
}: {
  variables: { filter: ComparisonsInput };
}): Promise<ComparisonListResponse> => {
  const res = await fetchGraphQLMutation<ComparisonListResponse>(
    GET_EMERGE_COMPARISON_LISTS_QUERY,
    variables,
  );
  return res as ComparisonListResponse;
};
