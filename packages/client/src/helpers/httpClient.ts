const STREAM_BASE_URL = `${import.meta.env.VITE_SERVER_ORIGIN}/stream`;

export const sseEvents = (url: string) =>
  new EventSource(`${STREAM_BASE_URL}/${url}`, {
    withCredentials: true,
  });
