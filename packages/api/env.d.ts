declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
      ORIGIN: string;
      CLIENT_ORIGIN: string;
      STYTCH_PROJECT_ID: string;
      STYTCH_SECRET: string;
    }

    interface Global {}
  }
}

export {};
