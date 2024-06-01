import create from 'zustand';
import io from 'socket.io-client';

const useSocketStore = create((set) => ({
  socket: null,
  connectSocket: () => {
    const socket = io('http://192.168.1.75:3000', {
      withCredentials: true,
    });
    socket.on('connect', () => {
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
