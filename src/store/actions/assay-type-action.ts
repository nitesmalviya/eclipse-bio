import { getAllAssayTypesAction } from "@/src/utils/graphql/assay-type/action";

// get all assays action
export const getAllAssayTypes = async () => {
  try {
    const res = await getAllAssayTypesAction();

    if (res.assayTypes.success) {
      return { success: true, data: res?.assayTypes };
    }
    return { success: false, message: res?.message || "Something went wrong" };
  } catch (error: any) {
    return {
      success: false,
      message: (error?.message as string) || "Something went wrong",
    };
  }
};
