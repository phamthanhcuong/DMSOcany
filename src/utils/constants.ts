import {Platform} from 'react-native';

// URL của API
export const API_URL = 'https://apidev.drinkocany.com/';
export const GOOGLE_MAPS_API_KEY = "AIzaSyCjYC5TPfi3uBLj3OW_Rn422GTzlVzoo98";

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


// Các thông báo thông dụng
export const COLORS = {
  PRIMARY: '#141e30',
  SECONDNARY: '#005bb5',
  SUCCESS: 'Đang tải...',
  WARNING: 'Không có kết nối Internet. Vui lòng kiểm tra lại.',
  ERROR: '#ff4b5c',

  BACKGROUD_INPUT: "#f0f0f0",
  BACKGROUD_LOGIN: "#0d47a1",

  BACKGROUD_HEADER: "#1f4068",
  SHADOW_HEADER:"#00c9ff",
  TEXT_HEADER:"#e4e4e4",

  INPUT:"#333",
  LABEL:"#e4e4e4",
  PLACEHOLDER: "#8a8a8a",
  ANIMATED:"#0a84ff",

  TEXT_FORGETPASSWORD:"#b0c4de",

  BLACK:"#000",
  WHITE:"#fff",

  SHADOW_LOGOUT:'#ff4b5c',
  BACKGROUD_LOGOUT: "#ff4b5c",

  BACKGROUD_ITEM: "#162447",
  SHADOW_ITEM:"#00c9ff",
  TEXT_ITEM:"#00c9ff",
};

// Các hằng số khác
export const MAX_CUSTOMERS_PER_PAGE = 10; // Số lượng khách hàng tối đa trên mỗi trang

// Thời gian timeout cho các yêu cầu API (ms)
export const API_TIMEOUT = 100;

export const isIos = Platform.OS === 'ios';