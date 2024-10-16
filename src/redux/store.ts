import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import customerReducer from './slices/customerSlice';
import orderReducer from './slices/orderSlice';
import authReducer from './slices/authSlice';

// Tạo store
const store = configureStore({
  reducer: {
    auth: authReducer,         
    customer: customerReducer, // Kết hợp customerSlice
    order: orderReducer, // Kết hợp orderSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Tùy chỉnh middleware nếu cần
});

// Định nghĩa RootState và AppDispatch để sử dụng trong hooks
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Tạo một hook để sử dụng dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
