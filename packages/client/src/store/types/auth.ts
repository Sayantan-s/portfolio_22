export interface LoginRequest {
  name: string;
  email: string;
}

export interface TransformedLoginApiResponse {
  status: number | undefined;
}

export type User = {
  id: string;
  email: string;
  name: string | null;
  newUser: boolean | null;
};

export interface Session {
  expires_at: Date;
  session_id: string;
}

export interface VerifyApiPayload {
  session_jwt: string;
  session_token: string;
  user: User;
  session?: Session;
}
