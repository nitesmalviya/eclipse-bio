import { CreateComparisonInput } from "@/types/comparison-list";
import { createComparisonAction } from "@/utils/graphql/comparisons/action";

// create comparison action
export const createComparison = async (data: CreateComparisonInput) => {
  try {
    const res = await createComparisonAction({
      variables: { input: data || {} },
    });

    if (res.createComparison.success) {
      return { success: true, data: res?.createComparison };
    }
    return {
      success: false,
      message: res?.createComparison?.message || "Something went wrong",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
};
