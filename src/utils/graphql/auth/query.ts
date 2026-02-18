import { gql, DocumentNode } from '@apollo/client';


//signin mutation
export const SIGN_IN_MUTATION: DocumentNode = gql`
 mutation Signin($input: SigninInput!) {
  signin(input: $input) {
    access_token
    message
    refresh_token
    success
    user {
      avatar_url
      email
      display_name
      first_name
      id
      last_name
      phone
      role
    }
  }
}
`;
//signup mutation
export const SIGN_UP_MUTATION: DocumentNode = gql`
 mutation Signup($input: SignupInput!) {
  signup(input: $input) {
    message
    success
  }
}
`;

//forget password mutation
export const FORGOT_PASSWORD_MUTATION: DocumentNode = gql`
  mutation ForgetPassword($input: ForgetPasswordInput!) {
    forgetPassword(input: $input) {
      success
      message
    }
  }
`;

//reset password mutation
export const RESET_PASSWORD_MUTATION: DocumentNode = gql`
 mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    success
    message
  }
}
`;

//signup email verification mutation
export const EMAIL_VERIFICATION_MUTATION: DocumentNode = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      success
      message
      access_token
      refresh_token
      user {
        avatar_url
        email
        display_name
        first_name
        id
        last_name
        phone
        role
      }
    }
  }
`;



//resend otp

export const RESEND_OTP_SIGNUP_MUTATION: DocumentNode = gql`
  mutation ResendOTP($email: String!) {
    resendOTP(email: $email)
  }
`;


//signup email verification mutation
export const LOGOUT_MUTATION: DocumentNode = gql`
  mutation Mutation {
    logout
  }
`;


export const CHANGE_PASSWORD_MUTATION: DocumentNode = gql`
mutation ChangePassword($input: ChangePasswordInput!) {
  ChangePassword(input: $input) {
    message
    success
  }
}`


export const GET_PRESIGNED_URL_MUTATION: DocumentNode = gql`
mutation GetPresignedUrlForArray($input: PresignedUrlArrayInput!) {
  getPresignedUrlForArray(input: $input) {
    data {
      file_path
      signedUrl
      
    }
    message
    success
  }
}
`;


export const UPDATE_USER_MUTATION: DocumentNode = gql`
mutation UpdateUser($updateUserId: String!, $updateUserInput: UpdateUserInput!) {
  updateUser(id: $updateUserId, updateUserInput: $updateUserInput) {
    message
    success
    user {
      avatar_path
      first_name
      last_name
      phone
      profile {
        session_description
        session_topic
        specialization
      }
    }
  }
}`

export const REFRESH_TOKEN_MUTATION: DocumentNode = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      access_token
      message
      refresh_token
      success
    }
  }
`;

export const GET_USER_TOKEN: DocumentNode = gql`query Gettoken {
  gettoken {
    message
    success
    tokenBalance
  }
}`
