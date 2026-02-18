export const PUBLIC_PATH = {
  HOME: "/",
  SIGNUP: "/signup",
  SIGNUP_VERIFY: "signup/verify",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  NEW_PASSWORD: "/forgot-password/new-password",
  FORGOT_PASSWORD_EMAIL_VERIFY: "/forgot-password/email-verify",
  FORGOT_PASSWORD_RESET_SUCCESS: "/forgot-password/reset-success",
  RESET_PASSWORD: "/reset-password",
};

export const PRIVATE_PATH = {
  ECOMPASS_HOME: "/home",
  EMERGE_HOME: "/emerge",
  EMERGE_PROJECT_VIEW: "/emerge/project-view",
  EMERGE_COMPARISON_LISTS: "/emerge/comparison-lists",
  ACCOUNT_SETTINGS: "/account-settings",
  ACCOUNT_SETTINGS_BILLING: "/account-settings/billing",
  ACCOUNT_SETTINGS_MODIFY_SUBSCRIPTION: "/account-settings/modify-subscription",
  ACCOUNT_SETTINGS_SUBSCRIPTION_MANAGEMENT:
    "/account-settings/subscription-management",
  ACCOUNT_SETTINGS_PURCHASE_CREDITS: "/account-settings/purchase-credits",
  EVERSE_HOME: "/everse",
  RNA_LIBRARY: "/rna-library",
};

export const ROUTES_PATH = {
  ...PUBLIC_PATH,
  ...PRIVATE_PATH,
};

export const pagePerOptions = [5, 10, 25];
export const limit = 10;

export const HOME_CONSTANTS = {
  HERO: {
    TITLE_LINE_1: "Lorem ipsum",
    TITLE_LINE_2: "dolor sit amet",
    DESCRIPTION:
      "Thank you for trusting Eclipsebio with your RNA characterization and optimization needs. Through this portal you can view the status of your current projects and review the result of completed projects.",
  },
};

export const HEADER_CONSTANTS = {
  TITLE: "Welcome to eCOMPASS",
};

export const DASHBOARD_ITEMS_LIMIT = 5;

export const EMERGE_PROJECT_TABS = ["All", "My projects", "Shared projects"];
export const EMERGE_COMPARISON_TABS = ["All", "Custom", "Recommended"];

export const SORT_ORDER = {
  ASC: "ASC" as const,
  DESC: "DESC" as const,
};

export const PAGINATION_LIMIT = {
  LIMIT: 10 as const,
  PAGE: 1 as const,
};