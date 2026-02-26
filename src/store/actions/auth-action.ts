"use client";
import { AppDispatch } from "../store";
import * as API from "../server-api-action/client-apis";
import * as authReducer from "../reducers/auth-reducer";
import Cookies from "js-cookie";
import {
  emailVerificationAction,
  forgetPasswordAction,
  logoutAction,
  resendOtpSignupAction,
  resetPasswordAction,
  signInAction,
  signupAction,
} from "@/utils/graphql/auth/action";
import {
  EmailVerificationInput,
  ForgetPasswordForm,
  ForgetPasswordInput,
  SignInInput,
  SignupInput,
} from "@/types/auth-type";
import { RoleType } from "@/types/common-types";

export const refreshToken = async (dispatch: AppDispatch) => {
  const res: any = await API.get("/api/auth/refresh");

  if (res?.accessToken) {
    Cookies.set("token", res.accessToken);
    // dispatch(authReducer.refreshToken(res.accessToken));
    return res.data;
  } else if (res === "token has expired") {
    dispatch({ type: "auth/logout" });
  } else {
    dispatch({ type: "auth/logout" });
  }
  return {
    access_token: "asdasdd",
  };
};

// sign in action
export const login = (form: SignInInput) => async (dispatch: AppDispatch) => {
  try {

    const res = await signInAction({ variables: { input: form } });
    if (res?.signin?.success) {
      const { access_token, refresh_token, user } = res.signin;
      dispatch(
        authReducer.login({
          access_token: access_token,
          refresh_token: refresh_token,
          user: { ...user, role: user?.role?.toLowerCase() as RoleType },
        }),
      );
      return {
        message: res?.signin?.message || "Login successful",
        success: true,
        data: { user: res?.signin?.user },
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

// sign up action
export const signup = async (form: SignupInput) => {
  try {

    const res = await signupAction({ variables: { input: form } });
    if (res?.signup?.success) {
      const { message } = res.signup;

      return {
        message: message || "Signup successfully",
        success: true,
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

// verify email action
export const verifyEmail =
  (form: EmailVerificationInput) => async (dispatch: AppDispatch) => {
    try {

      const res = await emailVerificationAction({ variables: { input: form } });
      if (res?.verifyEmail?.success) {
        const { access_token, refresh_token, user, message } = res.verifyEmail;
        dispatch(
          authReducer.login({
            access_token: access_token,
            refresh_token: refresh_token,
            user: { ...user, role: user?.role?.toLowerCase() as RoleType },
          }),
        );
        return {
          message: message || "Email verified successfully",
          success: true,
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

// logout action

export const appLogout = () => async (dispatch: AppDispatch) => {
  try {
    const res = await logoutAction();

    if (res?.logout?.success) {
      dispatch(authReducer.logout());
      return {
        message: res?.logout?.message || "Logout successfully",
        success: true,
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

// forget password action -> send code to email
export const forgetPassword = async (form: ForgetPasswordInput) => {
  try {

    const res = await forgetPasswordAction({ variables: { input: form } });
    if (res?.forgetPassword?.success) {
      const { message } = res.forgetPassword;

      return {
        message: message || "Code sent successfully on your email address",
        success: true,
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

// reset password action -> reset password
export const ResetPassword = async (form: ForgetPasswordForm) => {
  try {

    const res = await resetPasswordAction({ variables: { input: form } });
    if (res?.resetPassword?.success) {
      const { message } = res.resetPassword;

      return {
        message: message || "Code sent successfully on your email address",
        success: true,
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



//resend otp action

export const resendOtpSignup = async (email: string) => {
  try {

    const res = await resendOtpSignupAction({ variables: { email } });
    if (res?.resendOTP) {


      return {
        message: res?.resendOTP || "Code sent successfully on your email address",
        success: true,
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