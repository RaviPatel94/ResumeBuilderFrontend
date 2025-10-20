'use client';
import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = { 
  key: 'resumeBuilder', 
  storage,
  whitelist: ['projects']
};

const persistedReducer = persistReducer(persistConfig, projectsReducer);

export const store = configureStore({
  reducer: { projects: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;