// Định nghĩa kiểu dữ liệu cho đơn hàng
export interface Order {
    id: string;            // ID của đơn hàng
    customerId: string;   // ID của khách hàng liên quan đến đơn hàng
    items: OrderItem[];   // Danh sách các mặt hàng trong đơn hàng
    totalAmount: number;   // Tổng giá trị của đơn hàng
    status: 'pending' | 'completed' | 'canceled'; // Trạng thái của đơn hàng
    createdAt: string;    // Ngày tạo đơn hàng
    updatedAt: string;    // Ngày cập nhật đơn hàng
  }
  
  // Định nghĩa kiểu dữ liệu cho mặt hàng trong đơn hàng
  export interface OrderItem {
    productId: string;    // ID của sản phẩm
    quantity: number;     // Số lượng của sản phẩm
    price: number;        // Giá của sản phẩm
  }
  