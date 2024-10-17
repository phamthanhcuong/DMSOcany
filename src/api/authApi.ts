import axios from 'axios';
import {API_URL} from '../utils/constants';


const AuthenAPI = axios.create({
  baseURL: API_URL,
  timeout: 200000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (username: string, password: string) => {
  const response = await AuthenAPI.post('api/Authentication/Authenticate', {
    username,
    password,
  });
  return response.data;
};

export const registerUser = async (username: string, password: string) => {
  const response = await axios.post(`${AuthenAPI}/auth/register`, {
    username,
    password,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(`${AuthenAPI}/auth/logout`);
  return response.data;
};

export const getAgent = async (username: string) => {
  try {
    const response = await AuthenAPI.get(`/stringee/api/Agent/getAgentInfo/${username}`);

    return response.data;
  } catch (error) {
    throw error; // Ném lỗi để xử lý phía gọi hàm
  }
}
