import axios from 'axios';
import { LoginData, RegisterData } from '../models/authModel'; // Đường dẫn đến model chứa các kiểu dữ liệu liên quan đến xác thực

// Thiết lập base URL cho API xác thực
const AUTH_API_BASE_URL = 'https://api.yourservice.com/auth';

// Định nghĩa hàm để đăng nhập
// Trong file authApi.ts
export const loginApi = async (credentials: { email: string; password: string }) => {
    // Giả sử bạn gọi một API và nhận được phản hồi
    const response = await fetch('https://example.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error('Đăng nhập thất bại');
    }
  
    const data = await response.json();
    
    // Đảm bảo rằng data có thuộc tính email
    return data; // data nên có kiểu { email: string }
  };
  

// Định nghĩa hàm để đăng ký
export const registerUser = async (registerData: RegisterData): Promise<void> => {
  try {
    await axios.post(`${AUTH_API_BASE_URL}/register`, registerData);
    // Không cần trả về dữ liệu, chỉ cần xác nhận đã đăng ký thành công
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Ném lỗi để xử lý sau
  }
};

// Định nghĩa hàm để thay đổi mật khẩu
export const changePassword = async (userId: string, newPassword: string): Promise<void> => {
  try {
    await axios.put(`${AUTH_API_BASE_URL}/change-password`, { userId, newPassword });
    // Không cần trả về dữ liệu, chỉ cần xác nhận đã thay đổi mật khẩu thành công
  } catch (error) {
    console.error('Error changing password:', error);
    throw error; // Ném lỗi để xử lý sau
  }
};

// Thêm các hàm API khác liên quan đến xác thực ở đây nếu cần
