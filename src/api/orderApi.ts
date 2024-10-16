import axios, { AxiosError } from 'axios';
import { Order } from '../models/orderModel'; // Đường dẫn tới model đơn hàng

// Đặt URL của API ở đây
const API_URL = 'https://your-api-url.com/api/orders';

// Lấy danh sách đơn hàng từ API
export const fetchOrdersFromApi = async (): Promise<Order[]> => {
  try {
    const response = await axios.get<Order[]>(API_URL); // Gửi yêu cầu GET tới API
    return response.data; // Trả về danh sách đơn hàng
  } catch (error) {
    console.error('Error changing password:', error);
    throw error; // Ném lỗi để xử lý sau
  }
};

// Thêm đơn hàng mới vào API
export const addOrderToApi = async (newOrder: Order): Promise<Order> => {
  try {
    const response = await axios.post<Order>(API_URL, newOrder); // Gửi yêu cầu POST tới API
    return response.data; // Trả về đơn hàng đã thêm
  } catch (error) {
    console.error('Error changing password:', error);
    throw error; // Ném lỗi để xử lý sau
  }
};

// Cập nhật đơn hàng trong API
export const updateOrderInApi = async (updatedOrder: Order): Promise<Order> => {
  try {
    const response = await axios.put<Order>(`${API_URL}/${updatedOrder.id}`, updatedOrder); // Gửi yêu cầu PUT tới API
    return response.data; // Trả về đơn hàng đã cập nhật
  } catch (error) {
    console.error('Error changing password:', error);
    throw error; // Ném lỗi để xử lý sau
  }
};

// Xóa đơn hàng từ API
export const deleteOrderFromApi = async (orderId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${orderId}`); // Gửi yêu cầu DELETE tới API
  } catch (error) {
    console.error('Error changing password:', error);
    throw error; // Ném lỗi để xử lý sau
  }
};
