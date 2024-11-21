"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import socket from "../utils/socket";
import { useAuth } from "../providers/AuthProvider";
import toast from "react-hot-toast";

// Define the shape of the context
interface SocketContextType {
  socket: typeof socket;
  onlineUsers: Set<string>;
  isConnected: boolean;
}

// Create the context with an undefined initial value
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// SocketProvider component to manage socket connections and state
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const { token,user,guest } = useAuth();



  useEffect(() => {
    // Establish socket connection if token or username is available
    if (token || user?.username || guest?.username) {
      // Set authentication details for the socket
      socket.auth = token
        ? { token }
        : { username: guest?.username, id: guest?.id };
      socket.connect();

      // Handle successful connection
      socket.on("connect", () => {
        setIsConnected(true);
        console.log("Connected to socket server");
      });

      // Handle connection errors
      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setIsConnected(false);
      });

      // Handle user connection events
      socket.on("user:connected", (data) => {
        setOnlineUsers((prev) => new Set(prev).add(data.userId));
        toast.success(`${data.username} is now online`, {
          position: "bottom-right",
          duration: 3000,
        });
      });

      // Handle user disconnection events
      socket.on("user:disconnected", (data) => {
        setOnlineUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(data.userId);
          return newSet;
        });
        toast(`${data.username} is now offline`, {
          position: "bottom-right",
          duration: 3000,
        });
      });

      // Clean up event listeners and disconnect socket on unmount
      return () => {
        socket.off("connect");
        socket.off("connect_error");
        socket.off("user:connected");
        socket.off("user:disconnected");
        socket.disconnect();
      };
    }
  }, [token, user, guest]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the SocketContext
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
