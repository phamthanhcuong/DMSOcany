import axios, { AxiosResponse } from 'axios';
import { Order } from '../database/schemas/orderSchema';

// Địa chỉ API cho đơn hàng
const ORDER_API_URL = 'https://api.yourserver.com/orders/';

// Hàm lấy danh sách đơn hàng
export const getOrders = async (): Promise<Order[]> => {
  try {
    const response: AxiosResponse<Order[]> = await axios.get(ORDER_API_URL);
    return response.data; // Giả sử server trả về danh sách đơn hàng
  } catch (error: unknown) {
    handleAxiosError(error); // Xử lý lỗi
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

// Hàm thêm đơn hàng
export const addOrder = async (orderData: Order): Promise<Order> => {
  try {
    const response: AxiosResponse<Order> = await axios.post(ORDER_API_URL, orderData);
    return response.data; // Giả sử server trả về thông tin đơn hàng đã thêm
  } catch (error: unknown) {
    handleAxiosError(error);
    throw error;
  }
};

// Hàm cập nhật thông tin đơn hàng
export const updateOrder = async (orderId: string, orderData: Order): Promise<Order> => {
  try {
    const response: AxiosResponse<Order> = await axios.put(`${ORDER_API_URL}${orderId}`, orderData);
    return response.data; // Giả sử server trả về thông tin đơn hàng đã cập nhật
  } catch (error: unknown) {
    handleAxiosError(error);
    throw error;
  }
};

// Hàm xóa đơn hàng
export const deleteOrder = async (orderId: string): Promise<void> => {
  try {
    await axios.delete(`${ORDER_API_URL}${orderId}`);
    // Xử lý sau khi xóa nếu cần thiết
  } catch (error: unknown) {
    handleAxiosError(error);
    throw error;
  }
};

// Hàm xử lý lỗi Axios
const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Nếu là lỗi của Axios, lấy thông tin cụ thể từ response
    console.error('Error during order operation:', error.response?.data || error.message);
  } else if (error instanceof Error) {
    // Nếu là một lỗi chung
    console.error('Error:', error.message);
  } else {
    // Xử lý các loại lỗi khác nếu cần thiết
    console.error('Unknown error:', error);
  }
};
