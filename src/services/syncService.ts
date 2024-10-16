import realm from '../database/realmConfig';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo'; // Thư viện kiểm tra kết nối mạng

// Địa chỉ API cho đồng bộ hóa dữ liệu
const API_URL = 'https://api.yourserver.com/sync/';

// Hàm đồng bộ hóa dữ liệu lên server
export const syncDataToServer = async () => {
  const unsyncedData = realm.objects('YourDataModel').filtered('isSynced = false');

  if (unsyncedData.length > 0) {
    const dataArray = Array.from(unsyncedData);
    
    try {
      // Gửi dữ liệu lên server
      await axios.post(`${API_URL}data`, dataArray);
      
      // Cập nhật trạng thái đã đồng bộ trong Realm
      realm.write(() => {
        dataArray.forEach(item => {
          item.isSynced = true;
        });
      });
      console.log('Data synced successfully.');
    } catch (error: unknown) {
      handleAxiosError(error);
    }
  } else {
    console.log('No unsynced data found.');
  }
};

// Hàm kiểm tra kết nối mạng và thực hiện đồng bộ
export const checkNetworkAndSync = async () => {
  // Kiểm tra kết nối mạng
  const state = await NetInfo.fetch();
  const isConnected = state.isConnected;

  if (isConnected) {
    await syncDataToServer();
  } else {
    console.warn('No internet connection. Syncing will be deferred.');
  }
};

// Hàm xử lý lỗi Axios
const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error('Error during data sync:', error.response?.data || error.message);
  } else if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
};
