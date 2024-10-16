import axios, { AxiosResponse } from 'axios';

// Địa chỉ API cho xác thực
const AUTH_API_URL = 'https://api.yourserver.com/auth/';

// Hàm đăng nhập
export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.post(`${AUTH_API_URL}login`, { email, password });
    return response.data; // Giả sử server trả về thông tin người dùng sau khi đăng nhập thành công
  } catch (error: unknown) {
    handleAxiosError(error); // Xử lý lỗi
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

// Hàm đăng ký
export const register = async (email: string, password: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.post(`${AUTH_API_URL}register`, { email, password });
    return response.data; // Giả sử server trả về thông tin người dùng đã đăng ký thành công
  } catch (error: unknown) {
    handleAxiosError(error);
    throw error;
  }
};

// Hàm xử lý lỗi Axios
const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Nếu là lỗi của Axios, lấy thông tin cụ thể từ response
    console.error('Error during authentication:', error.response?.data || error.message);
  } else if (error instanceof Error) {
    // Nếu là một lỗi chung
    console.error('Error:', error.message);
  } else {
    // Xử lý các loại lỗi khác nếu cần thiết
    console.error('Unknown error:', error);
  }
};
