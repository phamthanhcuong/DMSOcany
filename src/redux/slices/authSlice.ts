import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../../api/authApi';
import { User } from '../../models/authModel';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: null | string;
  loading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async action for login
export const login = createAsyncThunk('auth/login', async (credentials: { username: string; password: string }) => {
  const response = await loginUser(credentials.username, credentials.password);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload;
        //state.user = action.payload; // Assuming payload contains user data
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;