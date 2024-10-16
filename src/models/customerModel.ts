// Định nghĩa kiểu dữ liệu cho khách hàng
export interface Customer {
  id: string;                  // ID của khách hàng
  name: string;                // Tên của khách hàng
  email: string;               // Địa chỉ email của khách hàng
  phone: string;               // Số điện thoại của khách hàng
  address: string;             // Địa chỉ của khách hàng
  createdAt: string;           // Ngày tạo khách hàng
  updatedAt: string;           // Ngày cập nhật khách hàng
  isActive: boolean;           // Trạng thái hoạt động của khách hàng
}

// Định nghĩa kiểu dữ liệu cho địa chỉ (nếu cần chi tiết hơn)
export interface Address {
  street: string;              // Tên đường
  city: string;                // Thành phố
  state: string;               // Bang
  zipCode: string;             // Mã bưu điện
}
