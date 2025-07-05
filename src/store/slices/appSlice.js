import { createSlice } from '@reduxjs/toolkit';

// Initial state for the app
const initialState = {
  isLoading: false,
  error: null,
  theme: 'light',
  sidebarOpen: false,
  notifications: [],
  currentPage: 'main',
};

// Create the app slice
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

// Export actions
export const {
  setLoading,
  setError,
  clearError,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  addNotification,
  removeNotification,
  clearNotifications,
  setCurrentPage,
} = appSlice.actions;

// Export reducer
export default appSlice.reducer;

// Selectors
export const selectIsLoading = (state) => state.app.isLoading;
export const selectError = (state) => state.app.error;
export const selectTheme = (state) => state.app.theme;
export const selectSidebarOpen = (state) => state.app.sidebarOpen;
export const selectNotifications = (state) => state.app.notifications;
export const selectCurrentPage = (state) => state.app.currentPage;