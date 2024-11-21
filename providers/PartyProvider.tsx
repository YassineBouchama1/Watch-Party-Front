"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import { useSocket } from "@/providers/SocketProvider";
import Modal from "@/components/Modal"; // Adjust the import path as necessary
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique IDs
import { useAuth } from "./AuthProvider";

// Define the shape of the context
interface PartyContextType {
  usersInParty: { userId: string; username: string; role: string }[];
}

// Define the props for the PartyProvider component
interface PartyProviderProps {
  children: ReactNode;
  partyId: string;
  userAuthed: any;
}

// Create the context with an undefined initial value
const PartyContext = createContext<PartyContextType | undefined>(undefined);

// PartyProvider component to manage party-specific socket events
export const PartyProvider: React.FC<PartyProviderProps> = ({
  children,
  partyId,
  userAuthed,
}) => {
  const { user, guest, setGuest } = useAuth();
  const { socket, isConnected } = useSocket();

  const [usersInParty, setUsersInParty] = useState<
    { userId: string; username: string; role: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ref to track if the user has already joined the party
  const hasJoinedParty = useRef(false);

  useEffect(() => {
    if (!userAuthed?.username) {
      // If no username is provided, open the modal
      console.log("Displaying modal because no username is found");
      setIsModalOpen(true);
    } else if (!hasJoinedParty.current) {
      console.log("Joining party with username:", userAuthed.username);
      joinParty(userAuthed.username);
      hasJoinedParty.current = true; // Mark as joined
    }
  }, [userAuthed]);

  const joinParty = (username: string) => {
    if (partyId && username) {
      // Join the party
      socket.emit("join:party", { partyId, username });

      // Listen for the initial list of users in the party
      socket.on(
        "list:joinParty",
        (users: { userId: string; username: string; role: string }[]) => {
          setUsersInParty(users);
          console.log("Users in party:", users);
        }
      );

      // Listen for new user connections in the same party
      socket.on(
        "user:joinParty",
        (data: { userId: string; username: string; role: string }) => {
          setUsersInParty((prevUsers) => [...prevUsers, data]);
          console.log(`${data.username} has joined the party`);
        }
      );

      // Listen for user disconnections in the same party
      socket.on("user:leaveParty", (data: { userId: string }) => {
        setUsersInParty((prevUsers) =>
          prevUsers.filter((user) => user.userId !== data.userId)
        );
        console.log(`${data.userId} has left the party`);
      });
    }
  };

  const handleModalClose = (username: string) => {
    // Generate a unique user ID and avatar
    const uniqueId = uuidv4();
    const avatar = `https://avatar.iran.liara.run/public`;

    // Set the user and close the modal
    const guestUser = {
      id: uniqueId,
      username,
      role: "guest",
      avatar,
    };
    setGuest(guestUser);
    setIsModalOpen(false);

    // Join the party with the generated username
    joinParty(username);
  };

  return (
    <PartyContext.Provider value={{ usersInParty }}>
      {isConnected && children}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Enter Your Username</h2>
          <input
            type="text"
            placeholder="Enter username"
            className="w-full p-2 border border-gray-300 rounded"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const input = e.target as HTMLInputElement;
                if (input.value.trim()) {
                  handleModalClose(input.value.trim());
                }
              }
            }}
          />
        </div>
      </Modal>
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
