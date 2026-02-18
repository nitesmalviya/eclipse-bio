import { CreateProjectInput } from "@/types/project";
import { createProjectAction } from "@/utils/graphql/project/action";

// create project action
export const createProject = async (data: CreateProjectInput) => {
  try {
    const res = await createProjectAction({
      variables: { input: data || {} },
    });

    if (res.createProject.success) {
      return { success: true, data: res?.createProject };
    }
    return { success: false, message: res?.message || "Something went wrong" };
  } catch (error:any) {
    return { success: false, message: error?.message as string || "Something went wrong" };
  }
};

