import axios from 'axios'
const API_URL = "http://localhost:3001/"
const API_URL_2 = "http://localhost:3001/login"
class AuthService{

    Login(data){
      return axios.post(API_URL_2, data);
    };

    Register(data){
      return axios.post(API_URL, data);
    };
}

export default new AuthService;