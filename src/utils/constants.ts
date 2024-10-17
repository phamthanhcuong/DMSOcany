// URL của API
export const API_URL = 'https://apidev.drinkocany.com/';

// Các mã trạng thái HTTP
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Các thông báo thông dụng
export const MESSAGES_HEADER = {
  SUCCESS: 'Thành công',
  ERROR: 'Lỗi'
};
// Các thông báo thông dụng
export const MESSAGES = {
  SUCCESS: 'Thành công!',
  ERROR: 'Đã xảy ra lỗi. Vui lòng thử lại.',
  LOADING: 'Đang tải...',
  NO_INTERNET: 'Không có kết nối Internet. Vui lòng kiểm tra lại.',
};

// Các hằng số khác
export const MAX_CUSTOMERS_PER_PAGE = 10; // Số lượng khách hàng tối đa trên mỗi trang

// Thời gian timeout cho các yêu cầu API (ms)
export const API_TIMEOUT = 100