"use server";
import { GetFeaturedDatasetsInput, GetFeaturedDatasetsResponse } from "@/src/types/dataset";
import { fetchGraphQLMutation } from "../..";
import { GET_ALL_PROJECTS_QUERY, GET_FEATURED_DATASETS_QUERY } from "./query";
import { ProjectsInput, ProjectsResponse } from "@/src/types/project";
 

export const getFeaturedDatasetsAction = async ({
  variables,
}: {
  variables: GetFeaturedDatasetsInput;
}): Promise<GetFeaturedDatasetsResponse> => {
  const res = await fetchGraphQLMutation<GetFeaturedDatasetsResponse>(
    GET_FEATURED_DATASETS_QUERY,
    { ...variables },
  );
  return res as GetFeaturedDatasetsResponse;
};

 
export const getAllProjectsAction = async ({
  variables,
}: {
  variables: { filter: ProjectsInput };
}): Promise<ProjectsResponse> => {
  const res = await fetchGraphQLMutation<ProjectsResponse>(
    GET_ALL_PROJECTS_QUERY,
    variables,
  );
  return res as ProjectsResponse;
};
