import axios, { AxiosResponse } from 'axios';
import { Customer } from '../database/schemas/customerSchema';
import realm from '../database/realmConfig';
import NetInfo from '@react-native-community/netinfo';

const API_URL = 'https://api.yourserver.com/customers/';

// Hàm lấy danh sách khách hàng
export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response: AxiosResponse<Customer[]> = await axios.get(API_URL);
    return response.data;
  } catch (error: unknown) {
    handleAxiosError(error); // Xử lý lỗi
    throw error; // Ném lại lỗi
  }
};

// Hàm thêm khách hàng
export const addCustomer = async (customerData: Customer): Promise<Customer> => {
  try {
    const response: AxiosResponse<Customer> = await axios.post(API_URL, customerData);
    return response.data;
  } catch (error: unknown) {
    handleAxiosError(error);
    throw error;
  }
};

// Hàm cập nhật thông tin khách hàng
export const updateCustomer = async (customerId: string, customerData: Customer): Promise<Customer> => {
  try {
    const response: AxiosResponse<Customer> = await axios.put(`${API_URL}${customerId}`, customerData);
    return response.data;
  } catch (error: unknown) {
    handleAxiosError(error);
    throw error;
  }
};

// Hàm xóa khách hàng
export const deleteCustomer = async (customerId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}${customerId}`);
  } catch (error: unknown) {
    handleAxiosError(error);
    throw error;
  }
};

// Hàm xử lý lỗi Axios
const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Nếu là lỗi của Axios, lấy thông tin cụ thể từ response
    console.error('Error fetching customers:', error.response?.data || error.message);
  } else if (error instanceof Error) {
    // Nếu là một lỗi chung
    console.error('Error:', error.message);
  } else {
    // Xử lý các loại lỗi khác nếu cần thiết
    console.error('Unknown error:', error);
  }
};

// Hàm đồng bộ dữ liệu từ Realm lên server
export const syncDataToServer = async () => {
  const unsyncedCustomers = realm.objects('Customer').filtered('isSynced = false');

  if (unsyncedCustomers.length > 0) {
    const customersArray = Array.from(unsyncedCustomers);
    
    try {
      await axios.post(`${API_URL}sync`, customersArray);
      
      realm.write(() => {
        customersArray.forEach(customer => {
          customer.isSynced = true;
        });
      });
    } catch (error: unknown) {
      handleAxiosError(error);
    }
  }
};

// Hàm kiểm tra kết nối mạng và thực hiện đồng bộ
export const checkNetworkAndSync = async () => {
  const state = await NetInfo.fetch();
  const isConnected = state.isConnected;

  if (isConnected) {
    await syncDataToServer();
  } else {
    console.warn('No internet connection. Syncing will be deferred.');
  }
};
