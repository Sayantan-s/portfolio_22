declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
      ORIGIN: string;
      CLIENT_ORIGIN: string;
    }

    interface Global {}
  }
}

export {};
