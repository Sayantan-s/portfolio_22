import { useUser } from "@hooks";
import {
  createContext,
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

const socket = io(import.meta.env.VITE_SERVER_ORIGIN, {
  withCredentials: true,
});
const WSContext = createContext<IContextProps | null>(null);

export const WsProvider = ({ children }: PropsWithChildren) => {
  const [isConnected, setIsConnected] = useState(false);
  const user = useUser();

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.on("connect", () => {
        console.log(`${socket.id} connected to socket server...`);
        setIsConnected(true);
      });
      socket.on("disconnect", () => {
        console.log(`${socket.id} Disconnected from socket server...`);
        setIsConnected(false);
      });
      return () => {
        socket.disconnect();
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
