import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
/**
* Configuration du store Redux avec la fonction configureStore de Redux Toolkit
*/
export const store = configureStore({
    // Met à jour la slice auth avec le reducer authReducer
    reducer: {
        auth: authReducer,
    },
});
window.store = store;