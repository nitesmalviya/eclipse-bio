"use server";

import { fetchGraphQLMutation } from "../..";
import { CREATE_COMPARISON_MUTATION } from "./query";
import {
  CreateComparisonInput,
  CreateComparisonResponse,
} from "@/types/comparison-list";

// create comparison action
export const createComparisonAction = async ({
  variables,
}: {
  variables: { input: CreateComparisonInput };
}): Promise<CreateComparisonResponse> => {
  const res = await fetchGraphQLMutation<CreateComparisonResponse>(
    CREATE_COMPARISON_MUTATION,
    variables,
  );
  return res as CreateComparisonResponse;
};
