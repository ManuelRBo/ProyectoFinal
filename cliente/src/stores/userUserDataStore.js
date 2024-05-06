import { create } from 'zustand';
import axios from 'axios';

export const useUserDataStore = create((set) => ({
    userData: {},
    userLoading: true,
    setUserData: () => set(
        axios.get('api/userdata/userData')
        .then(res => {
            set({userData: res.data})
            set({userLoading: false})
        })
    ),
}))