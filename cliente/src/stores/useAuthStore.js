import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) => ({
    isAuth: false,
    login: () => set({ isAuth: true }),
    logout: async () => {
        await axios.post('/api/auth/logout');
        set({ isAuth: false });
    }
}));
