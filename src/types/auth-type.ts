import { RoleType } from "./common-types";

export type AuthState = {
  access_token: string;
  refresh_token: string;
  user: User | null;
};

export type SigninPayload = {
  access_token: string;
  user: User;
  refresh_token: string;
};

export type RefreshTokenRes = {
  refreshToken: {
    access_token: string;
    message: string;
    refresh_token: string | null;
    success: boolean;
  };
};

export interface User {
  display_name: string;
  id: string;
  email: string;
  avatar_url?: string;
  active_status: boolean;
  first_name: string;
  last_name: string;
  phone: string;
  role: RoleType;
  profile: {
    timezone: string;
  };
}

export interface SignInResponse {
  signin?: {
    success: boolean;
    message: string;
    access_token: string;
    refresh_token: string;
    user: User;
  };
  message: string;
  success: boolean;
}

export type SignInInput = {
  email: string;
  password: string;
};

export type SignupInput = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  department?: string;
};

export type SignupResponse = {
  signup?: {
    success: boolean;
    message: string;
  };
  message: string;
  success: boolean;
};

export type TokenResponse = {
  message: string;
  gettoken: {
    message: string;
    success: boolean;
    tokenBalance: number;
  };
};

export type ForgetPasswordInput = {
  email: string;
};

export type ForgetPasswordResponse = {
  forgetPassword?: {
    success: boolean;
    message: string;
  };
  message: string;
  success: boolean;
};

export type ResetPasswordResponse = {
  resetPassword?: {
    success: boolean;
    message: string;
  };
  message: string;
  success: boolean;
};

export type ForgetPasswordForm = {
  email: string;
  reset_token: string;
  new_password: string;
  confirm_password: string;
};

export type EmailVerificationInput = {
  email: string;
  verification_code: string;
  password: string;
};

export interface EmailVerificationResponse {
  verifyEmail?: {
    success: boolean;
    message: string;
    access_token: string;
    refresh_token: string;
    user: User;
  };
  message: string;
  success: boolean;
}

export type ResendOtpSignupResponse = {

  resendOTP?: string;
  message: string;
  success: boolean;
}

export interface LogoutResponse {
  logout?: {
    success: boolean;
    message: string;
  };
  message: string;
  success: boolean;
}



export interface ForgetPasswordProps {
  form: ForgetPasswordForm;
  setForm: (form: ForgetPasswordForm) => void;
  setStep: (step: number) => void;
}
