   import { io } from 'socket.io-client';

   const socket = io(process.env.NEXT_PUBLIC_API_URL || "", {
     autoConnect: false,
     reconnection: true,
     reconnectionAttempts: 5,
     reconnectionDelay: 1000,
   });

   export const initializeSocket = (
    
     token: string,
     username: string,
 
   ) => {
     if (token) {
       socket.auth = {  token  };
     } else if (username) {
       socket.auth = { username };
     }
     socket.connect();
   };

   export default socket;