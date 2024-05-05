import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    isAuth: false,
    login: () => set({ isAuth: true }),
    logout: () => set({ isAuth: false }),
}));