import { store } from "@/store";
import { useUser } from "@hooks";
import {
  createContext,
  createRef,
  MutableRefObject,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface IContextProps {
  socket: Socket;
  isConnected: boolean;
}

const auth = store.getState().auth;

const socket = io(import.meta.env.VITE_SERVER_ORIGIN, {
  withCredentials: true,
  autoConnect: false,
  auth: {
    "X-API-KEY": import.meta.env.VITE_API_KEY,
    ...(auth.access_token
      ? { access_token: auth.access_token }
      : { session_token: auth.session_token }),
  },
});

export const socketConnected =
  createRef<boolean>() as MutableRefObject<boolean>;
socketConnected.current = false;

const WSContext = createContext<IContextProps | null>(null);

export const WsProvider = ({ children }: PropsWithChildren) => {
  const [isConnected, setIsConnected] = useState(false);
  const user = useUser();

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.on("connect", () => {
        console.log(`${socket.id} connected to socket server...`);
        socketConnected.current = true;
        setIsConnected(true);
      });
      socket.on("disconnect", () => {
        console.log(`${socket.id} Disconnected from socket server...`);
        setIsConnected(false);
        socketConnected.current = false;
      });
      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
      return () => {
        socket.disconnect();
        socket.off("connect_error");
      };
    }
  }, [user]);

  return (
    <WSContext.Provider value={{ isConnected, socket }}>
      {children}
    </WSContext.Provider>
  );
};

export const useWebS = () => {
  const context = useContext(WSContext);
  if (!context) throw new Error("Failed to intantiate WS.Provider");
  return context;
};
