'use client';
import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './projectSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = { key: 'resume', storage };
const persistedReducer = persistReducer(persistConfig, resumeReducer);

export const store = configureStore({
  reducer: { resume: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
