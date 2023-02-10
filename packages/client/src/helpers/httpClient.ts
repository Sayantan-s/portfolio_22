const STREAM_BASE_URL = `${import.meta.env.VITE_SERVER_ORIGIN}/stream`;

export const sseEvents = (url: string) =>
  new EventSource(`${STREAM_BASE_URL}/${url}`, {
    withCredentials: true,
  });

interface onSSEEvents {
  onSuccess: (this: EventSource, ev: MessageEvent<any>) => void;
  onError?: (ev: Event) => any;
}

export const sseStream = (url: string, sseEves: onSSEEvents) => {
  const sseEvent = sseEvents(url);
  sseEvent.onmessage = sseEves.onSuccess;
  sseEvent.onerror = (eve) => {
    sseEves.onError?.(eve);
  };
  return { close: () => sseEvent.close() };
};
