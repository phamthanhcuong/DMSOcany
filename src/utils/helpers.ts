// Import thư viện cần thiết
import NetInfo from '@react-native-community/netinfo'; // Kiểm tra trạng thái kết nối mạng
import moment from 'moment'; // Xử lý và định dạng ngày tháng

// Helper kiểm tra trạng thái kết nối mạng
export const isOnline = async (): Promise<boolean> => {
    try {
      const { isConnected } = await NetInfo.fetch();
      return isConnected ?? false;
    } catch (error) {
      console.error('Error checking network status:', error);
      return false;
    }
  };
  
  // Helper để định dạng ngày tháng
  export const formatDate = (date: Date, format: string = 'DD/MM/YYYY'): string => {
    try {
      return moment(date).format(format);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };
  
  // Helper để làm sạch chuỗi văn bản (ví dụ: loại bỏ khoảng trắng thừa)
  export const cleanText = (text: string): string => {
    return text.trim().replace(/\s+/g, ' ');
  };
  
  // Helper để kiểm tra dữ liệu đầu vào (ví dụ: kiểm tra email hợp lệ)
  export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Helper để chuyển đổi và xử lý số điện thoại đầu vào
  export const formatPhoneNumber = (phoneNumber: string): string => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phoneNumber;
  };