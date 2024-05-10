import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    isAuth: false,
    login: () => set({ isAuth: true }),
    logout: () => set(
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;',
        { isAuth: false }

    )
}));