import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

// Register
export const registerUser = createAsyncThunk('/auth/register',
    async (FormData) => {
        const response = await axios.post(
            'https://fashion-website-backend.vercel.app/api/auth/register',
            FormData,
            { withCredentials: true }
        );
        return response.data;
    }
);

// Login
export const loginUser = createAsyncThunk('/auth/login',
    async (FormData) => {
        const response = await axios.post(
            'https://fashion-website-backend.vercel.app/api/auth/login',
            FormData,
            { withCredentials: true }
        );
        return response.data;
    }
);

// Logout
export const logoutUser = createAsyncThunk('/auth/logout',
    async () => {
        const response = await axios.post(
            'https://fashion-website-backend.vercel.app/api/auth/logout',
            {},
            { withCredentials: true }
        );
        return response.data;
    }
);

// Check Auth
export const checkAuth = createAsyncThunk('/auth/checkauth',
    async () => {
        try {
            const response = await axios.get(
                "https://fashion-website-backend.vercel.app/api/auth/check-auth",
                { withCredentials: true }
            );

            if (response.data.success) {
                return response.data;
            } else {
                return { success: false, user: null };
            }
        } catch (error) {
            return { success: false, user: null };
        }
    }
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // Check Auth
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
