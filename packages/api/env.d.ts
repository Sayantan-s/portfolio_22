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
      SESSION_SECRET: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_PASSWORD: string;
      API_KEY: string;
      FREE_ACCESS_EMAIL: string;
      JWT_SECRET: string;
    }

    interface Global {}
  }
}

export {};
