import { Route, Routes } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Details from "./components/details/details";
import Home from "./views/Home/Home";
import { getPhones, getBrands, getCapacity } from "./redux/actions";
import { CreateProduct } from "./components/FormCreateProduct/CreateProduct";
import Store from "./views/store/store";
import About from "./views/About/About";
import Cart from "./views/Cart/Cart";
import NotFount from "./views/notFount/NotFount"
import Login from "./views/Login/login"
import Wishlist from "./views/WishList/Wishlist";
import Register from "./views/Register/register"

export default function App(){

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhones());
    dispatch(getBrands());
    dispatch(getCapacity());
  }, []);

  return (

    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/form-product" element={<CreateProduct />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/About" element={<About />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/WishList" element={<Wishlist />} />
        <Route path ="*" element={<NotFount />} />
      </Routes>
    </div>
  )
}