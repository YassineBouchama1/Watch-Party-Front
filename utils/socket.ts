import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL || "", {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export const initializeSocket = (userId: string, token: string) => {
  socket.auth = { userId, token };
  socket.connect();
};

export default socket;