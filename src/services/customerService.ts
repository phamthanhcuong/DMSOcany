// src/services/customerService.ts

import realm, { Customer } from '../database/realm';  // Import Realm và mô hình Customer
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo'; // Sử dụng NetInfo để kiểm tra trạng thái mạng

// Hàm đồng bộ dữ liệu từ Realm lên server
export const syncDataToServer = async () => {
  const unsyncedCustomers = realm.objects<Customer>('Customer').filtered('isSynced = false'); // Lấy khách hàng chưa được đồng bộ

  if (unsyncedCustomers.length > 0) {
    const customersArray = Array.from(unsyncedCustomers);  // Chuyển dữ liệu từ Realm thành mảng
    
    try {
      // Gửi dữ liệu lên server qua API
      await axios.post('https://api.yourserver.com/customers/sync', customersArray);
      
      // Cập nhật trạng thái đã đồng bộ trong Realm sau khi gửi thành công
      realm.write(() => {
        customersArray.forEach(customer => {
          customer.isSynced = true;  // Đánh dấu khách hàng đã được đồng bộ
        });
      });

      console.log('Dữ liệu đã được đồng bộ thành công');
    } catch (error) {
      console.error('Lỗi khi đồng bộ dữ liệu lên server:', error);
    }
  }
};

// Hàm kiểm tra kết nối mạng và thực hiện đồng bộ
export const checkNetworkAndSync = () => {
  // Sử dụng NetInfo để kiểm tra kết nối mạng
  NetInfo.fetch().then(state => {
    if (state.isConnected) {
      console.log('Có kết nối mạng, bắt đầu đồng bộ dữ liệu...');
      syncDataToServer();  // Nếu có mạng, thực hiện đồng bộ
    } else {
      console.log('Không có kết nối mạng, không thể đồng bộ.');
    }
  });
};
