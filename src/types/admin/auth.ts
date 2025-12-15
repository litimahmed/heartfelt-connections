export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  admin_id: string;
  email: string;
  nom: string;
  access: string;
  refresh: string;
}