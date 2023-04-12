import { Route, Routes } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Details from "./components/details/details";
import Home from "./views/Home/Home";
import { getPhones, getBrands, getCapacity, LoginSuccess } from "./redux/actions";
import { CreateProduct } from "./components/FormCreateProduct/CreateProduct";
import Store from "./views/store/store";
import About from "./views/About/About";
import Cart from "./views/Cart/Cart";
import NotFount from "./views/notFount/NotFount"
import Login from "./views/Login/login"
import Wishlist from "./views/WishList/Wishlist";
import Register from "./views/Register/register"
import Dashboard from "./views/Dashboard/Dashboard";
import UsersDashBoard from "./views/Dashboard/Users/User";

export default function App(){

  const dispatch = useDispatch();
  
  useEffect(() => {
    if(window.localStorage.getItem('user-log')){
      dispatch(LoginSuccess(JSON.parse(window.localStorage.getItem('user-log'))))
    }
  }, [])

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
        <Route path="/DashBoard" element={<Dashboard />} />
        <Route path="/UsersDashBoard" element={<UsersDashBoard />} />
        <Route path ="*" element={<NotFount />} />
        <Route path ="/PasswordChange" element={< LinkPassword />} />
        <Route path ="/RecetPassword" element={< ActPassword  />} />
      </Routes>
    </div>
  )
}