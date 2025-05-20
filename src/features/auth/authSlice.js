import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';
/**
 * Slice d'authentification
 * Gère l'état d'authentification de l'utilisateur ses infos et les actions associées avec Redux Toolkit.
 */
// Récupére le token depuis le localStorage s'il existe
const token = localStorage.getItem('token');

// Thunk asynchrone pour la connexion de l'utilisateur dispatch les credentials à l'auth et stocke le token 
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await authService.login(credentials);
            // Stocke le token dans le localStorage
            localStorage.setItem('token', data.body.token);
            return data.body;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
// Thunk asynchrone pour récupérer les infos utilisateur avec le token stocké
export const fetchUserProfile = createAsyncThunk(
    'auth/profile',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const data = await authService.getUserProfile(token);
            return data.body;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
// Thunk asynchrone pour maj les infos utilisateur avec le token stocké
export const updateUserName = createAsyncThunk(
    'auth/updateName',
    async (userData, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const data = await authService.updateUserProfile(token, userData);
            return data.body;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
// État initial de la slice d'auth, utilise le token du localStorage pour déterminer si l'utilisateur est déjà authentifié
const initialState = {
    token: token || null,
    user: null,
    isAuthenticated: token ? true : false,  // Convertit token en booléen
    isLoading: false,
    error: null,
};
// Création de la slice d'auth avec Redux Toolkit, definit les reducers et les extraReducers de Redux Toolkit pour l'async
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Déconnexion user et clear des données de session
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        // Clear des erreurs d'auth
        clearError: (state) => {
            state.error = null;
        },
    },
    // ExtraReducers pour gérer les états des actions thunks async
    extraReducers: (builder) => {
        builder
            // ===== Authentification =====
            // Pending de l'api
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            // Login ok : stocke le token et maj isAuthenticated à true
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            // Login nok : stocke l'erreur 
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to login';
            })
            // ===== Profil user =====
            // Pending de l'api
            .addCase(fetchUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            // Profil ok : stocke les data dans le state user
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            // Profil nok : stocke l'erreur 
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch profile';
            })
            // ===== Maj profil =====
            // Pending de l'api
            .addCase(updateUserName.pending, (state) => {
                state.isLoading = true;
            })
             // Maj profil ok : stocke les data dans le state user
            .addCase(updateUserName.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            // Maj profil nok : stocke l'erreur 
            .addCase(updateUserName.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update profile';
            });
    },
});
// Export des actions et du reducer
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;