import axios from 'axios'
const API_URL = "http://localhost:3001/"

class AuthService{

    Login(data){
      return axios.post(API_URL, data);
    };

    Register(data){
      return axios.post(API_URL, data);
    };
}

export default new AuthService;