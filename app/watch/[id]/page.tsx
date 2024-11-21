"use client";
import { useSocket } from "@/providers/SocketProvider";
import React, { useEffect } from "react";

const PartyPage = () => {
  const { socket } = useSocket();


  const partyId = "partyid"; 

  useEffect(() => {
    if (partyId ) {
      // Join the party
      socket.emit("join:party", { partyId });

      // Listen for users connected to the party
      socket.on("userConnectedParty", (users) => {
        console.log("Users in party:", users);
      });


      
      // Listen for new user connections
      socket.on("user:connected", (data) => {
        console.log(`${data.username} has joined the party`);
      });

      // Listen for user disconnections
      socket.on("user:disconnected", (data) => {
        console.log(`${data.username} has left the party`);
      });
    }

    return () => {
      if (partyId ) {
        // Leave the party
        socket.emit("leave:party", { partyId });
      }
      socket.off("userconnectedparty");
      socket.off("user:connected");
      socket.off("user:disconnected");
    };
  }, [partyId,  socket]);

  return (
    <div>
      <h1>Party Page</h1>
      <p>Party ID: {partyId}</p>
      <p>Username: </p>
    </div>
  );
};

export default PartyPage;
