import { Route, Routes } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Details from "./components/details/details";
import { getPhones } from "./redux/actions";

import { CreateProduct } from "./FormCreateProduct/CreateProduct";


import Store from "./views/store/store"; 

import Home from "./views/Home/Home";
import Cart from "./views/Cart/Cart";



export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPhones());
  }, []);

  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/form-product" element={<CreateProduct />} />
      <Route path="/" element={<Home />} />
      <Route path="details/:id" element={<Details />} />
      <Route path="Store" element={<Store />} />
      <Route path="/Cart" element={<Cart />} />
    </Routes>
  </div>


  );
}
