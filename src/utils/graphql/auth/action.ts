"use server";
import { fetchGraphQLMutation } from "../..";
import {
    EMAIL_VERIFICATION_MUTATION,
    FORGOT_PASSWORD_MUTATION,
    LOGOUT_MUTATION,
    REFRESH_TOKEN_MUTATION,
    RESEND_OTP_SIGNUP_MUTATION,
    RESET_PASSWORD_MUTATION,
    SIGN_IN_MUTATION,
    SIGN_UP_MUTATION,
} from "./query";
import { RefreshTokenRes, SignInResponse, SignInInput, ForgetPasswordInput, ForgetPasswordResponse, SignupInput, SignupResponse, ForgetPasswordForm, ResetPasswordResponse, EmailVerificationInput, EmailVerificationResponse, LogoutResponse, ResendOtpSignupResponse } from "@/src/types/auth-type";



// sign up action
export const signupAction = async ({
    variables,
}: {
    variables: { input: SignupInput };
}): Promise<SignupResponse> => {
    const res = await fetchGraphQLMutation<SignupResponse>(SIGN_UP_MUTATION, variables);
    return res as SignupResponse;
};



//signup  ->  email verification action
export const emailVerificationAction = async ({
    variables,
}: {
    variables: { input: EmailVerificationInput };
}): Promise<EmailVerificationResponse> => {
    const res = await fetchGraphQLMutation<EmailVerificationResponse>(
        EMAIL_VERIFICATION_MUTATION,
        variables,
    );
    return res as EmailVerificationResponse;
};


// sign in action
export const signInAction = async ({
    variables,
}: {
    variables: { input: SignInInput };
}): Promise<SignInResponse> => {
    const res = await fetchGraphQLMutation<SignInResponse>(SIGN_IN_MUTATION, variables);
    return res as SignInResponse;
};

// forget password action -> send code to email
export const forgetPasswordAction = async ({
    variables,
}: {
    variables: { input: ForgetPasswordInput };
}): Promise<ForgetPasswordResponse> => {
    const res = await fetchGraphQLMutation<ForgetPasswordResponse>(
        FORGOT_PASSWORD_MUTATION,
        variables,
    );
    return res as ForgetPasswordResponse;
};

//reset password action
export const resetPasswordAction = async ({
    variables,
}: {
    variables: { input: ForgetPasswordForm };
}): Promise<ResetPasswordResponse> => {
    const res = await fetchGraphQLMutation<ResetPasswordResponse>(
        RESET_PASSWORD_MUTATION,
        variables,
    );
    return res as ResetPasswordResponse;
};

//reset password action
export const logoutAction = async (): Promise<LogoutResponse> => {
    const res = await fetchGraphQLMutation<LogoutResponse>(
        LOGOUT_MUTATION,
        {},
    );
    return res as LogoutResponse;
};




//resend otp action
export const resendOtpSignupAction = async ({
    variables,
}: {
    variables: { email: string };
}): Promise<ResendOtpSignupResponse> => {
    const res = await fetchGraphQLMutation<ResendOtpSignupResponse>(
        RESEND_OTP_SIGNUP_MUTATION,
        variables,
    );
    return res as ResendOtpSignupResponse;
};

export const refreshToken = async (refreshToken: string): Promise<RefreshTokenRes> => {
    const variables = { refreshToken };
    const res = await fetchGraphQLMutation<RefreshTokenRes>(
        REFRESH_TOKEN_MUTATION,
        variables
    );
    return res;
};
