"use server";

import { CreateProjectInput, CreateProjectResponse } from "@/types/project";
import { fetchGraphQLMutation } from "../../";
import { CREATE_PROJECT_MUTATION } from "./query";

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
