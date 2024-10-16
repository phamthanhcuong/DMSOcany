import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Customer } from '../../models/customerModel'; // Đường dẫn tới model khách hàng
import { fetchCustomersFromApi, addCustomerToApi } from '../../api/customerApi'; // Đường dẫn tới API

// Định nghĩa kiểu trạng thái cho khách hàng
interface CustomerState {
  customers: Customer[];    // Danh sách khách hàng
  loading: boolean;         // Trạng thái tải
  error: string | null;     // Thông báo lỗi
}

// Giá trị khởi tạo cho trạng thái
const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
};

// Định nghĩa Async Thunk để lấy danh sách khách hàng
export const fetchCustomers = createAsyncThunk<Customer[], void>(
  'customer/fetchCustomers',
  async () => {
    const response = await fetch('YOUR_API_ENDPOINT'); // Thay đổi với endpoint của bạn
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Giả sử rằng API trả về mảng khách hàng
  }
);


// Tạo slice cho khách hàng
const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push(action.payload); // Thêm khách hàng vào danh sách
    },
    removeCustomer: (state, action) => {
      state.customers = state.customers.filter(customer => customer.id !== action.payload.id); // Xóa khách hàng theo ID
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true; // Đang tải dữ liệu
        state.error = null;   // Reset lỗi
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false; // Đã tải xong
        state.customers = action.payload; // Cập nhật danh sách khách hàng
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false; // Kết thúc tải
        state.error = action.error.message || 'Failed to fetch customers'; // Thiết lập thông báo lỗi
      });
  },
});

// Xuất các action và reducer
export const { addCustomer, removeCustomer } = customerSlice.actions;
export const selectAllCustomers = (state: { customer: CustomerState }) => state.customer.customers; // Selector để lấy danh sách khách hàng
export const selectCustomerLoading = (state: { customer: CustomerState }) => state.customer.loading; // Selector để kiểm tra trạng thái tải
export const selectCustomerError = (state: { customer: CustomerState }) => state.customer.error; // Selector để lấy thông báo lỗi

export default customerSlice.reducer; // Xuất reducer
