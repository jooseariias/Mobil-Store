import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./components/home/home";
import { getPhones } from "./redux/actions";

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhones())
  }, [])

  return (
    <div>
      <Home />
    </div>
  );
}
