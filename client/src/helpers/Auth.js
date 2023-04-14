import axios from 'axios'



const {BACK_URL} = process.env
const API_URL_2 = `${BACK_URL}/login`
class AuthService{

    Login(data){
      return axios.post(API_URL_2, data);
    };

    Register(data){
      return axios.post(BACK_URL, data);
    };
}

export default new AuthService;