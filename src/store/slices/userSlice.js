import { createSlice } from '@reduxjs/toolkit';

// Initial state for user
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  session: null,
  preferences: {
    language: 'en',
    currency: 'USD',
    notifications: true,
  },
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.session = null;
    },
    setUserLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
    },
    clearUserError: (state) => {
      state.error = null;
    },
    setSession: (state, action) => {
      state.session = action.payload;
    },
    updateUserPreferences: (state, action) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      };
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

// Export actions
export const {
  setUser,
  clearUser,
  setUserLoading,
  setUserError,
  clearUserError,
  setSession,
  updateUserPreferences,
  updateUserProfile,
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;
export const selectSession = (state) => state.user.session;
export const selectUserPreferences = (state) => state.user.preferences;