import create from 'zustand';
import io from 'socket.io-client';

const useSocketStore = create((set) => ({
  socket: null,
  connectSocket: (id) => {
    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log(id);
      console.log('Usuario conectado');
    });
    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
    set({ socket });
  },
  disconnectSocket: () => {
    set((state) => {
      if (state.socket) {
        state.socket.disconnect();
      }
      return { socket: null };
    });
  },
}));

export default useSocketStore;
