import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKETSERVER_ORIGIN);

export const useWebS = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
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
  }, []);

  return { socket, isConnected };
};
