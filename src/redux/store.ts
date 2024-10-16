import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import customerReducer from './slices/customerSlice';
import orderReducer from './slices/orderSlice';
import authReducer from './slices/authSlice';
import reportReducer from './slices/reportSlice';


// Cấu hình redux-persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Lưu trữ trong AsyncStorage (React Native)
  whitelist: ['auth'], // Chỉ lưu trạng thái auth, có thể thêm các slice khác
};

// Kết hợp các reducer
const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  order: orderReducer,
  report: reportReducer,
});

// Tạo reducer đã được persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Tùy chỉnh middleware nếu cần
});

// Định nghĩa RootState và AppDispatch để sử dụng trong hooks
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Tạo một hook để sử dụng dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Khởi tạo persistor
const persistor = persistStore(store);

export { store, persistor };

