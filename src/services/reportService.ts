import axios, { AxiosResponse } from 'axios';
import { Report } from '../database/schemas/reportSchema';

// Địa chỉ API cho báo cáo
const REPORT_API_URL = 'https://api.yourserver.com/reports/';

// Hàm lấy danh sách báo cáo
export const getReports = async (): Promise<Report[]> => {
  try {
    const response: AxiosResponse<Report[]> = await axios.get(REPORT_API_URL);
    return response.data; // Giả sử server trả về danh sách báo cáo
  } catch (error: unknown) {
    handleAxiosError(error); // Xử lý lỗi
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

// Hàm thêm báo cáo
export const addReport = async (reportData: Report): Promise<Report> => {
  try {
    const response: AxiosResponse<Report> = await axios.post(REPORT_API_URL, reportData);
    return response.data; // Giả sử server trả về thông tin báo cáo đã thêm
  } catch (error: unknown) {
    handleAxiosError(error);
    throw error;
  }
};

// Hàm cập nhật thông tin báo cáo
export const updateReport = async (reportId: string, reportData: Report): Promise<Report> => {
  try {
    const response: AxiosResponse<Report> = await axios.put(`${REPORT_API_URL}${reportId}`, reportData);
    return response.data; // Giả sử server trả về thông tin báo cáo đã cập nhật
  } catch (error: unknown) {
    handleAxiosError(error);
    throw error;
  }
};

// Hàm xóa báo cáo
export const deleteReport = async (reportId: string): Promise<void> => {
  try {
    await axios.delete(`${REPORT_API_URL}${reportId}`);
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
    console.error('Error during report operation:', error.response?.data || error.message);
  } else if (error instanceof Error) {
    // Nếu là một lỗi chung
    console.error('Error:', error.message);
  } else {
    // Xử lý các loại lỗi khác nếu cần thiết
    console.error('Unknown error:', error);
  }
};
