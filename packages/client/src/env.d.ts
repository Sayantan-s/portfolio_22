/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string;
  readonly VITE_SOCKETSERVER_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
