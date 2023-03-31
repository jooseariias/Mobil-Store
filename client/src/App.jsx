import { Route, Routes } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPhones } from "./redux/actions";

import Home from "./views/Home/Home";
import Cart from "./views/Cart/Cart";

export default function App(){

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhones())
  }, [])

  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/Cart" element={<Cart />} />
    </Routes>
  </div>
  );
}