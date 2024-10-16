import realm, { Customer } from '../database/realm';
import axios from 'axios';

// Hàm đồng bộ dữ liệu từ Realm lên server
export const syncDataToServer = async () => {
  const unsyncedCustomers = realm.objects('Customer').filtered('isSynced = false');

  if (unsyncedCustomers.length > 0) {
    const customersArray = Array.from(unsyncedCustomers);
    
    try {
      // Gửi dữ liệu lên server
      await axios.post('https://api.yourserver.com/customers/sync', customersArray);
      
      // Cập nhật trạng thái đã đồng bộ trong Realm
      realm.write(() => {
        customersArray.forEach(customer => {
          customer.isSynced = true;
        });
      });
    } catch (error) {
      console.error('Error syncing data to server:', error);
    }
  }
};

// Hàm kiểm tra kết nối mạng và thực hiện đồng bộ
export const checkNetworkAndSync = () => {
  // Giả sử bạn có một hàm kiểm tra kết nối mạng
  // Sử dụng thư viện như `react-native-netinfo` để kiểm tra kết nối mạng
  const isConnected = true; // Bạn cần thay đổi nó bằng cách kiểm tra thực tế

  if (isConnected) {
    syncDataToServer();
  }
};