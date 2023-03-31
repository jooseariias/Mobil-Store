import { Route, Routes } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./components/home/home";
import { getPhones } from "./redux/actions";
import Store from "./views/store/store";

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhones())
  }, [])

  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/Store" element={<Store />} />
    </Routes>
  </div>
  );
}