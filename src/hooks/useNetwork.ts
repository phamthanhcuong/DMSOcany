import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

// Hook để kiểm tra trạng thái mạng
const useNetwork = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    // Đăng ký sự kiện lắng nghe thay đổi trạng thái mạng
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    // Cleanup khi component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};

// Hàm kiểm tra trạng thái mạng, có thể dùng trong các logic khác
export const isOnline = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return state.isConnected ?? false;
};

export default useNetwork;