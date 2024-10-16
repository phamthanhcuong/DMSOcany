import axios from 'axios';

// Thiết lập base URL cho API
const API_BASE_URL = 'https://api.yourservice.com';

// Tạo một instance của axios với cấu hình mặc định
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Thời gian chờ tối đa cho một yêu cầu
  headers: {
    'Content-Type': 'application/json',
    // Bạn có thể thêm các header khác nếu cần
  },
});

// Định nghĩa một hàm để xử lý lỗi
const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    // Nếu lỗi là từ axios
    console.error('Axios error:', error.message);
    return Promise.reject(error.response?.data || error.message);
  } else {
    console.error('Unexpected error:', error);
    return Promise.reject('An unexpected error occurred.');
  }
};

// Định nghĩa hàm để thực hiện GET request
export const get = async (url: string) => {
  try {
    const response = await apiClient.get(url);
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    return handleError(error); // Xử lý lỗi
  }
};

// Định nghĩa hàm để thực hiện POST request
export const post = async (url: string, data: any) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    return handleError(error); // Xử lý lỗi
  }
};

// Định nghĩa hàm để thực hiện PUT request
export const put = async (url: string, data: any) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    return handleError(error); // Xử lý lỗi
  }
};

// Định nghĩa hàm để thực hiện DELETE request
export const remove = async (url: string) => {
  try {
    await apiClient.delete(url);
    return; // Không cần trả về dữ liệu
  } catch (error) {
    return handleError(error); // Xử lý lỗi
  }
};
