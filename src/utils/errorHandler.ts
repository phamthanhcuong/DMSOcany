// Helper xử lý lỗi cho API và hiển thị thông báo lỗi cho người dùng

export class ErrorHandler {
    // Phương thức để xử lý lỗi từ các yêu cầu API
    public static handleApiError(error: any): string {
      if (error.response) {
        const statusCode = error.response.status;
        switch (statusCode) {
          case 400:
            return 'Yêu cầu không hợp lệ. Vui lòng kiểm tra và thử lại.';
          case 401:
            return 'Bạn không có quyền truy cập. Vui lòng đăng nhập lại.';
          case 403:
            return 'Bạn không được phép thực hiện hành động này.';
          case 404:
            return 'Không tìm thấy tài nguyên yêu cầu.';
          case 500:
            return 'Lỗi máy chủ. Vui lòng thử lại sau.';
          case 503:
            return 'Dịch vụ hiện không khả dụng. Vui lòng thử lại sau.';
          default:
            return 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.';
        }
      } else if (error.request) {
        // Lỗi xảy ra khi không nhận được phản hồi từ server
        return 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.';
      } else {
        // Các lỗi khác trong khi thiết lập yêu cầu
        return `Đã xảy ra lỗi: ${error.message}`;
      }
    }
  
    // Phương thức để ghi lại lỗi vào log (ví dụ: gửi log đến server hoặc lưu vào file log)
    public static logError(error: any): void {
      console.error('Error logged:', error); // Thay đổi logic ghi log nếu cần
      // Bạn có thể mở rộng chức năng này để gửi log lỗi đến một dịch vụ monitoring như Sentry hoặc Firebase Crashlytics
    }
  
    // Phương thức để hiển thị thông báo lỗi người dùng (UI-friendly message)
    public static displayErrorMessage(error: any): void {
      const errorMessage = this.handleApiError(error);
      // Tích hợp với thư viện UI như Toast hoặc Alert để hiển thị thông báo cho người dùng
      console.error(errorMessage); // Hoặc thay thế bằng thư viện hiển thị thông báo người dùng
    }
  }