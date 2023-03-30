import { Route, Routes } from "react-router-dom"
import Home from "./views/Home/Home";

export default function App(){
  

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}