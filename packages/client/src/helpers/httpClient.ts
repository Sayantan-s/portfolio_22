export const sseEvents = new EventSource(
  `${import.meta.env.VITE_SERVER_ORIGIN}/stream`,
  {
    withCredentials: true,
  }
);
