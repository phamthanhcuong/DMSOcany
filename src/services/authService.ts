import { store } from '../redux/store'; 

class AuthService {
  
  async getAuthToken (){
    const state = await  store.getState(); // Lấy state từ Redux store
    return state.auth.token; // Lấy token từ auth state
  };
}

export default new AuthService();