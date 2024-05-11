import { create } from 'zustand';
import axios from 'axios';

export const useUserDataStore = create((set) => ({
    userData: {},
    userLoading: true,
    userRequestData: [],
    userFriendsData: [],
    setUserData: () => {
        axios.get('api/userdata/userData')
        .then(res => {
            set({
                userData: res.data,
                userLoading: false
            });
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    },
    setUserRequestData: () => {
        axios.get('/api/userdata/userRequestData')
        .then(res => {
            set({
                userRequestData: res.data,
                userLoading: false
            });
        })
        .catch(error => {
            console.error('Error fetching user request data:', error);
        });
    },
    setUserFriendsData: () => {
        axios.get('/api/userdata/userFriendsData')
        .then(res => {
            set({
                userFriendsData: res.data,
                userLoading: false
            });
        })
        .catch(error => {
            console.error('Error fetching user friends data:', error);
        });
    },
}));
