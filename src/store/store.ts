// store/index.ts
'use client';
import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectSlice';
import userReducer from './userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const projectsPersistConfig = { 
  key: 'resumeBuilder', 
  storage,
};

const persistedProjectsReducer = persistReducer(projectsPersistConfig, projectsReducer);

export const store = configureStore({
  reducer: { 
    projects: persistedProjectsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
