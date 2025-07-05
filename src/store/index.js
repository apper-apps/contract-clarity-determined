import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import userSlice from "./slices/userSlice";

// Configure the Redux store with RTK
export const store = configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__,
});

// Export types for TypeScript (optional, but good practice)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export store as default to match import pattern
export default store;