import axios from 'axios';
import { Report } from '../models/reportModel'; // Import kiểu Report từ model của bạn

const API_URL = 'https://api.yourserver.com/reports'; // Đường dẫn tới API của bạn

// Hàm để lấy danh sách báo cáo
export const getReports = async (): Promise<Report[]> => {
  const response = await axios.get(`${API_URL}`);
  return response.data; // Giả sử API trả về danh sách báo cáo
};

// Hàm để lấy báo cáo theo ID
export const getReportById = async (id: string): Promise<Report> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data; // Giả sử API trả về báo cáo cụ thể
};

// Hàm để thêm một báo cáo mới
export const createReport = async (report: Report): Promise<Report> => {
  const response = await axios.post(`${API_URL}`, report);
  return response.data; // Giả sử API trả về báo cáo đã được tạo
};

// Hàm để cập nhật một báo cáo
export const updateReport = async (id: string, report: Report): Promise<Report> => {
  const response = await axios.put(`${API_URL}/${id}`, report);
  return response.data; // Giả sử API trả về báo cáo đã được cập nhật
};

// Hàm để xóa một báo cáo
export const deleteReport = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
