import {
  getEmergeComparisonsAction,
  getEmergeProjectsAction,
} from "@/utils/graphql/emerge/action";
import { ProjectsInput } from "@/types/project";
import { ComparisonsInput } from "@/types/comparison-list";

export const getEmergeProjects = async (data: ProjectsInput) => {
  try {
    const res = await getEmergeProjectsAction({
      variables: { filter: data || {} },
    });

    if (res.projects.success) {
      return { success: true, data: res?.projects };
    }
    return { success: false, message: res?.message || "Something went wrong" };
  } catch (error:any) {
    return { success: false, message: error?.message as string || "Something went wrong" };
  }
};

export const getEmergeComparisons = async (data: ComparisonsInput) => {
  try {
    const res = await getEmergeComparisonsAction({
      variables: { filter: data || {} },
    });

    if (res.comparisons.success) {
      return { success: true, data: res?.comparisons };
    }
    return { success: false, message: res?.message || "Something went wrong" };
  } catch (error:any) {
    return { success: false, message: error?.message as string || "Something went wrong" };
  }
};
