import axios from 'axios';
import { Customer } from '../models/customerModel'; // Đường dẫn đến model Customer

// Thiết lập base URL cho API
const API_BASE_URL = 'https://api.yourservice.com/customers';

// Định nghĩa hàm để lấy danh sách khách hàng từ API
export const fetchCustomersFromApi = async (): Promise<Customer[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data; // Trả về danh sách khách hàng
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error; // Ném lỗi để xử lý sau
  }
};

// Định nghĩa hàm để thêm một khách hàng
export const addCustomerToApi = async (customer: Customer): Promise<Customer> => {
  try {
    const response = await axios.post(API_BASE_URL, customer);
    return response.data; // Trả về khách hàng đã thêm
  } catch (error) {
    console.error('Error adding customer:', error);
    throw error; // Ném lỗi để xử lý sau
  }
};

// Định nghĩa hàm để cập nhật thông tin một khách hàng
export const updateCustomerInApi = async (customerId: string, customer: Customer): Promise<Customer> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${customerId}`, customer);
    return response.data; // Trả về khách hàng đã cập nhật
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error; // Ném lỗi để xử lý sau
  }
};

// Định nghĩa hàm để xóa một khách hàng
export const deleteCustomerFromApi = async (customerId: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${customerId}`);
    // Không cần trả về dữ liệu, chỉ cần xác nhận đã xóa
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error; // Ném lỗi để xử lý sau
  }
};

// Thêm các hàm API khác cho khách hàng ở đây nếu cần
