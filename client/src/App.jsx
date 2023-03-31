import { Route, Routes } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./components/home/home";
import { getPhones } from "./redux/actions";
import { CreateProduct } from "./FormCreateProduct/CreateProduct";
export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhones())
  }, [])

  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/form-product" element={<CreateProduct />} />
    </Routes>
  </div>
  );
}
