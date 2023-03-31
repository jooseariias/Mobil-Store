import { Route, Routes } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Details from "./components/details/details";
import Home from "./components/home/home";
import { getPhones } from "./redux/actions";

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
      </Routes>
    </div>
  );
}