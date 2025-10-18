'use client';
import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './resumeSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = { key: 'resume', storage };

const persistedReducer = persistReducer(persistConfig, resumeReducer);

export const store = configureStore({
  reducer: { resume: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for redux-persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
