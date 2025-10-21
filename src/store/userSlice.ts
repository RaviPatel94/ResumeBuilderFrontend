// store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Initialize state from localStorage
const getInitialState = (): UserState => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    const id = localStorage.getItem('userId');

    if (token && email && id) {
      return {
        id,
        email,
        token,
        isAuthenticated: true,
      };
    }
  }

  return {
    id: null,
    email: null,
    token: null,
    isAuthenticated: false,
  };
};

const initialState: UserState = getInitialState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<{ id: string; email: string; token: string }>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('userEmail', action.payload.email);
        localStorage.setItem('userId', action.payload.id);
      }
    },

    logoutUser(state) {
      state.id = null;
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        localStorage.removeItem('projectsMetadata');
      }
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
