import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as reportApi from '../../api/reportApi';
import { Report } from '../../models/reportModel';

// Định nghĩa kiểu dữ liệu cho trạng thái báo cáo
interface ReportState {
  reports: Report[];
  loading: boolean;
  error: string | null;
}

// Trạng thái khởi tạo
const initialState: ReportState = {
  reports: [],
  loading: false,
  error: null,
};

// Định nghĩa thunk để lấy danh sách báo cáo từ API
export const fetchReports = createAsyncThunk<Report[], void, { rejectValue: string }>(
  'report/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      const reports = await reportApi.getReports(); // Gọi API để lấy báo cáo
      return reports;
    } catch (error) {
      return rejectWithValue('Lỗi khi lấy báo cáo');
    }
  }
);

// Định nghĩa slice cho báo cáo
const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    clearReports(state) {
      state.reports = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Lỗi không xác định';
      });
  },
});

// Xuất các action và reducer
export const { clearReports } = reportSlice.actions;
export default reportSlice.reducer;
