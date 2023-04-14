import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Details from "./components/details/details";
import Home from "./views/Home/Home";

import {
  getPhones,
  getBrands,
  getCapacity,
  LoginSuccess,
} from "./redux/actions";

import { CreateProduct } from "./components/FormCreateProduct/CreateProduct";
import Store from "./views/store/store";
import About from "./views/About/About";
import Cart from "./views/Cart/Cart";
import NotFount from "./views/notFount/NotFount";
import Login from "./views/Login/login";
import Wishlist from "./views/WishList/Wishlist";
import Register from "./views/Register/register";
import Dashboard from "./views/Dashboard/Dashboard";
import Support from "./views/Support/Support";
import RutePrivade from "./components/rutePrivade/RutePrivade";
//import Products from "./views/Dashboard/Product/Products";

import UsersDashBoard from "./views/Dashboard/Users/User";

import LinkPassword from "./components/LinkPassword/LinkPassword";
// import ActPassword from "./components/ActPassword/ActPassword";
import { CreateReviews } from "./components/Reviews/CreateReviews";

// import ResetPassword from "./components/ActPassword/ResetPassword";
// import LinkPassword from "./components/LinkPassword/LinkPassword";
// import ActPassword from "./components/ActPassword/ActPassword";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage.getItem("user-log")) {
      dispatch(
        LoginSuccess(JSON.parse(window.localStorage.getItem("user-log")))
      );
    }
  }, []);

  useEffect(() => {
    dispatch(getPhones());
    dispatch(getBrands());
    dispatch(getCapacity());
  }, []);

  //const user = localStorage.getItem("user");
  //const userPared = JSON.parse(user);
  //const userRol = userPared.rol;
  //console.log(userRol);

  return (
    <div className="App">
      <Routes>
        //rutas Users
        <Route exact path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/About" element={<About />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/WishList" element={<Wishlist />} />
        <Route path="/:productId/review" element={<CreateReviews />} />
        <Route path="/PasswordChange" element={<LinkPassword />} />
        <Route path="*" element={<NotFount />} />
        //Rutas Admin
        <Route element={<RutePrivade />}>
          <Route path="/DashBoard" element={<Dashboard />} />
          <Route path="/UsersDashBoard" element={<UsersDashBoard />} />
          <Route exact path="/form-product" element={<CreateProduct />} />
        </Route>
      </Routes>
    </div>
  );
}
