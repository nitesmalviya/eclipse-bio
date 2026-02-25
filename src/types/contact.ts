// ===============================
// Contact Entity Model
// ===============================
export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  updated_at: string;
}

// ===============================
// Create Contact Input (Client -> Server)
// IMPORTANT: id & timestamps server generate karega
// ===============================
export interface CreateContactUsInput {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
}

// ===============================
// GraphQL Mutation Data Shape
// ===============================
export interface CreateContactUsData {
  success: boolean;
  message: string;
  data: Contact;
}

// ===============================
// Final GraphQL Response
// (IMPORTANT: key must match GraphQL query)
// ===============================
export interface CreateContactUsResponse {
  contactUs: CreateContactUsData;
}