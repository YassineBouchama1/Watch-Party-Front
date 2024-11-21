"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSocket } from "@/providers/SocketProvider";

// Define the shape of the context
interface PartyContextType {
  usersInParty: string[];
}

// Define the props for the PartyProvider component
interface PartyProviderProps {
  children: ReactNode;
  partyId: string;
  username?: string;
}

// Create the context with an undefined initial value
const PartyContext = createContext<PartyContextType | undefined>(undefined);

// PartyProvider component to manage party-specific socket events
export const PartyProvider: React.FC<PartyProviderProps> = ({
  children,
  partyId,

}) => {
  const { socket, onlineUsers } = useSocket();
  const [usersInParty, setUsersInParty] = useState<string[]>([]);

  useEffect(() => {
    if (partyId ) {
      // Join the party
      socket.emit("join:party", { partyId });

      // Listen for the initial list of users in the party
      socket.on("list:ConnectedParty", (users: string[]) => {
        setUsersInParty(users);
        console.log("Users in party:", users);
      });

      // Listen for new user connections in the same party
      socket.on(
        "user:connectedParty",
        (data: { role: string; username: string }) => {
        
            setUsersInParty((prevUsers) => [...prevUsers, data.username]);
            console.log(`${data.username} has joined the party`);
          }
        
      );

      // Listen for user disconnections in the same party
      socket.on(
        "user:disconnectedParty",
        (data: { role: string; username: string }) => {
         
            setUsersInParty((prevUsers) =>
              prevUsers.filter((user) => user !== data.username)
            );
            console.log(`${data.username} has left the party`);
          
        }
      );
    }

    return () => {
      if (partyId ) {
        // Leave the party
        socket.emit("leave:party", { partyId });
      }
      // Clean up event listeners
      socket.off("list:ConnectedParty");
      socket.off("user:connectedParty");
      socket.off("user:disconnectedParty");
    };
  }, [partyId, socket]);

  return (
    <PartyContext.Provider value={{ usersInParty }}>
      {children}
    </PartyContext.Provider>
  );
};

// Custom hook to use the PartyContext
export const useParty = (): PartyContextType => {
  const context = useContext(PartyContext);
  if (!context) {
    throw new Error("useParty must be used within a PartyProvider");
  }
  return context;
};
