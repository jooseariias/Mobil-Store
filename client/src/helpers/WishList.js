import axios from 'axios'
const API_URL = "http://localhost:3001/wishlist/"

class WishListService{

  // const { idUser, idProduct } = req.body

  PostProductWishList(data){
    return axios.post(API_URL, data);
  }

  // const { idUser } = req.params

  GetProductsWishList(id){
  }

  // const { idUser, idProduct } = req.params;

  DeleteProductWishList(id){
    return axios.post(API_URL, data);
  }
}

export default new WishListService;