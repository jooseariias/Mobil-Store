import { Route, Routes } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Details from "./components/details/details";
import Home from "./views/Home/Home";
import { getPhones } from "./redux/actions";
import Store from "./views/store/store";


export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhones());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="Store" element={<Store />} />
      </Routes>
    </div>
  );
}