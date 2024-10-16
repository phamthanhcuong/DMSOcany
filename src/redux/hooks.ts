import { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { fetchOrders } from './slices/orderSlice';
import { fetchCustomers } from './slices/customerSlice';
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo

// Custom hook để lấy đơn hàng từ Redux store
export const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.order.orders);
  const loading = useSelector((state: RootState) => state.order.loading);
  const error = useSelector((state: RootState) => state.order.error);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return { orders, loading, error };
};

// Custom hook để lấy khách hàng từ Redux store
export const useCustomers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector((state: RootState) => state.customer.customers);
  const loading = useSelector((state: RootState) => state.customer.loading);
  const error = useSelector((state: RootState) => state.customer.error);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return { customers, loading, error };
};

// Custom hook để kiểm tra trạng thái mạng
export const useNetwork = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true); // Khởi tạo trạng thái kết nối

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected === true); // Cập nhật trạng thái kết nối, chỉ gán true nếu là true
    });

    return () => {
      unsubscribe(); // Hủy đăng ký khi component unmount
    };
  }, []);

  return isConnected; // Trả về trạng thái kết nối
};
