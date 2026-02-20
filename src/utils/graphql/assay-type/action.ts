"use server";
import { AssayTypesResponse } from "@/src/types/assay-type";
import { fetchGraphQLQuery } from "../..";
import { GET_ALL_ASSAY_TYPES_QUERY } from "./query";

// get all assays action
export const getAllAssayTypesAction = async () => {
  const res = await fetchGraphQLQuery(GET_ALL_ASSAY_TYPES_QUERY);
  return res as AssayTypesResponse;
};
