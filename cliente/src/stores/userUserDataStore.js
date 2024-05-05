import { create } from 'zustand';

export const useUserDataStore = create((set) => ({
    userData: {},
    setUserData: () => set(
        axios
    ),
}))