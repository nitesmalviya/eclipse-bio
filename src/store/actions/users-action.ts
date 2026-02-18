

import { getUserById } from "@/utils/graphql/users/action";


//get user profile by id action

export const getUserProfileByIdAction = async (userId: string) => {
    try {
        
      const res = await getUserById({userId});
      

      if (res.user.success) {
        return {
          success: true,
          data: res.user.data,
          message: res.user.message,
        };
      }
      return {
        success: false,
        data: null,
        message: res.user.message,
      };
    } catch (err: any) {
      return {
        message: err?.message as string,
        success: false,
      };
    }
}