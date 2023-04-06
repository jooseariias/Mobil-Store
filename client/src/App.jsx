import { Route, Routes } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Details from "./components/details/details";
import Home from "./views/Home/Home";
import { getPhones } from "./redux/actions";
import { CreateProduct } from "./components/FormCreateProduct/CreateProduct";
import Store from "./views/store/store";
import About from "./views/About/About";
import Cart from "./views/Cart/Cart";

export default function App(){

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhones());
  }, []);

  return (

    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/form-product" element={<CreateProduct />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/About" element={<About />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </div>
  )
}