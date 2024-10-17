// Định nghĩa kiểu dữ liệu cho thông tin đăng nhập
export interface LoginData {
    email: string;      // Địa chỉ email của người dùng
    password: string;   // Mật khẩu của người dùng
  }
  
  // Định nghĩa kiểu dữ liệu cho thông tin đăng ký
  export interface RegisterData {
    username: string;   // Tên người dùng
    phone: string;      // Số điện thoại của người dùng
    password: string;   // Mật khẩu của người dùng
  }
  
  // Định nghĩa kiểu dữ liệu cho thông tin người dùng
  export interface User {
    id: string;         // ID của người dùng
    username: string;   // Tên người dùng
    email: string;      // Địa chỉ email của người dùng
    phone: string;      // Số điện thoại của người dùng
    createdAt: string;  // Ngày tạo tài khoản
    updatedAt: string;  // Ngày cập nhật tài khoản
  }
  
  // Định nghĩa kiểu dữ liệu cho phản hồi khi đăng nhập
  export interface LoginResponse {
    token: string;      // Token xác thực trả về khi đăng nhập thành công
    user: User;        // Thông tin người dùng
  }
  
  // Định nghĩa kiểu dữ liệu cho phản hồi khi đăng ký
  export interface RegisterResponse {
    message: string;    // Thông báo khi đăng ký thành công
  }
  