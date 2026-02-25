import { GetFeaturedDatasetsInput } from "@/src/types/dataset";
import { ProjectsInput } from "@/src/types/project";
import {
  getAllProjectsAction,
  getFeaturedDatasetsAction,
} from "@/src/utils/graphql/home/action";

// get all projects action
export const getAllProjects = async (data?: ProjectsInput) => {
  try {
    const res = await getAllProjectsAction({
      variables: { filter: data || {} },
    });

    if (res?.projects?.success) {
      return {
        success: true,
        data: res.projects,
      };
    } else {
      return {
        message: res?.message || "Something went wrong",
        success: false,
      };
    }
  } catch (err: any) {
    return {
      message: err?.message as string,
      success: false,
    };
  }
};

// get featured datasets action
export const getFeaturedDatasets = async (form?: GetFeaturedDatasetsInput) => {
  try {
    const res = await getFeaturedDatasetsAction({ variables: form || {} });


    if (res?.getFeaturedDatasets?.success) {
      return {
        success: true,
        data: res?.getFeaturedDatasets,
      };
    } else {
      return {
        message: res?.message || "Something went wrong",
        success: false,
      };
    }
  } catch (err: any) {
    return {
      message: err?.message as string,
      success: false,
    };
  }
};
