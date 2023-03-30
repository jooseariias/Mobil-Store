import { Route, Routes } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./views/Home/Home";
import { getPhones } from "./redux/actions";

export default function App(){

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhones())
  }, [])

  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  </div>
  );
}