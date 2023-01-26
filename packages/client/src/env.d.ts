/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string;
  readonly VITE_SERVER_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module Api {
  interface SuccessResponse<TData> {
    requestId: string;
    statusCode: number;
    success: true;
    data: TData;
  }
  interface SuccessResponseNoPayload {
    requestId: string;
    statusCode: number;
    success: true;
  }
}
