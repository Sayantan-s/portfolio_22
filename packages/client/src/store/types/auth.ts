export interface LoginRequest {
  email: string;
}

export interface TransformedLoginApiResponse {
  status: number | undefined;
}

export type ProfileLinks = {
  instgram: string | null;
  linkedin: string;
  github: string | null;
  dribble: string;
  behance: string | null;
  website: string;
};

export type UserDetails = {
  first_name: string;
  last_name: string;
  headline: string;
  about: string;
  profile_links: ProfileLinks;
  profile_pic: string;
};

export type User = {
  id: string;
  email: string;
  newUser: boolean;
  details: UserDetails | null;
  updated_at: Date;
  created_at: Date;
};

export interface Session {
  expires_at: Date;
  session_id: string;
}

export interface VerifyApiPayload {
  session_jwt: string;
  session_token: string;
  session: Session;
  user: User;
}
