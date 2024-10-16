import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../../models/orderModel'; // Đường dẫn tới model đơn hàng
import { fetchOrdersFromApi, addOrderToApi } from '../../api/orderApi'; // Đường dẫn tới API

// Định nghĩa kiểu trạng thái cho đơn hàng
interface OrderState {
  orders: Order[];     // Danh sách đơn hàng
  loading: boolean;    // Trạng thái tải
  error: string | null; // Thông báo lỗi
}

// Giá trị khởi tạo cho trạng thái
const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

// Tạo action để lấy danh sách đơn hàng từ API
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await fetchOrdersFromApi(); // Gọi hàm API để lấy đơn hàng
    return response; // Trả về dữ liệu đơn hàng
  }
);

// Tạo slice cho đơn hàng
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload); // Thêm đơn hàng vào danh sách
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload.id); // Xóa đơn hàng theo ID
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true; // Đang tải dữ liệu
        state.error = null;   // Reset lỗi
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false; // Đã tải xong
        state.orders = action.payload; // Cập nhật danh sách đơn hàng
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false; // Kết thúc tải
        state.error = action.error.message || 'Failed to fetch orders'; // Thiết lập thông báo lỗi
      });
  },
});

// Xuất các action và reducer
export const { addOrder, removeOrder } = orderSlice.actions;
export const selectAllOrders = (state: { order: OrderState }) => state.order.orders; // Selector để lấy danh sách đơn hàng
export const selectOrderLoading = (state: { order: OrderState }) => state.order.loading; // Selector để kiểm tra trạng thái tải
export const selectOrderError = (state: { order: OrderState }) => state.order.error; // Selector để lấy thông báo lỗi

export default orderSlice.reducer; // Xuất reducer
