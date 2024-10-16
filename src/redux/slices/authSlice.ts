import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../../api/authApi'; // Giả sử bạn đã tạo một hàm gọi API cho đăng nhập

interface User {
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null; // Đảm bảo kiểu dữ liệu phù hợp
  loading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Action để thực hiện đăng nhập
export const login = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }) => {
  const response = await loginApi(credentials);
  return response; // Giả sử response chứa thông tin người dùng sau khi đăng nhập thành công
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
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
        state.user = { email: action.payload.email }; // Gán đối tượng phù hợp cho user
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Đăng nhập thất bại';
      });
  },
});

// Export actions và reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
