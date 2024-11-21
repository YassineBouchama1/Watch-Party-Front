"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import socket from "../utils/socket";
import { useAuth } from "../providers/AuthProvider";
import toast from "react-hot-toast";


interface SocketContextType {
  socket: typeof socket;
  onlineUsers: Set<string>;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);
//this is the config socketion
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const { token } = useAuth();


  const username = 'fak guest'

   useEffect(() => {
     if (token || username) {
       // Initialize socket connection
       if (token) {
         socket.auth = { token };
       } else if (username) {
         socket.auth = { username: username };
       }
       socket.connect();

       // Connection events
       socket.on("connect", () => {
         setIsConnected(true);
         console.log("Connected to socket server");
       });

       socket.on("connect_error", (error) => {
         console.error("Socket connection error:", error);
         setIsConnected(false);
       });

       // User status events
       socket.on("user:connected", (data) => {
         setOnlineUsers((prev) => new Set(prev).add(data.userId));
         toast.success(`${data.username} is now online`, {
           position: "bottom-right",
           duration: 3000,
         });
       });

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

       // Initial online users
       //  socket.on("onlineUsers", (users) => {
       //    setOnlineUsers(
       //      new Set(
       //        users.map((u: { userId: string; username: string }) => u.userId)
       //      )
       //    );
       //  });
     }

     return () => {
       socket.off("connect");
       socket.off("connect_error");
       socket.off("user:connected");
       socket.off("user:disconnected");
       socket.off("onlineUsers");
       socket.disconnect();
     };
   }, [token, username]);
   
  return (
    <SocketContext.Provider value={{ socket, onlineUsers, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
