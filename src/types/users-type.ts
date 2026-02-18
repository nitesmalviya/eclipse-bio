export interface UserProfile {
  id: string;
  email: string;

  first_name: string | null;
  last_name: string | null;
  display_name: string | null;

  avatar_url: string | null;
  phone: string | null;

  job_title: string | null;
  department: string | null;
  bio: string | null;

  role: string;
//   permissions: string[]; 
//   settings: Record<string, any>;

//   notification_preferences: Record<string, any>;

//   stripe_customer_id: string | null;

  last_login_at: string | null; // ISO date string
  last_login_ip: string | null;

  login_count: number;

  user_sub_id: string | null;

  email_verified: boolean;
  email_verified_at: string | null;

  active_status: boolean;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GetUserByIdResponse {
  user: {
    success: boolean;
    message: string;
    data: UserProfile;
  };
  success: boolean;
  message: string;
}
