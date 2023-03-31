import { Route, Routes } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Details from "./components/details/details";
import { getPhones } from "./redux/actions";
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
        <Route path="/" element={<Home />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="Store" element={<Store />} />
        <Route path="/Cart" element={<Cart />} />

      </Routes>
    </div>
  );
}