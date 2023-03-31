import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";

function Details() {
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id))
  }, []);

  console.log(details);
  return <div>
    <h1>{details.name}</h1>
    <img src={details.image} alt={details.name}/>
    <span>Price: ${details.price}</span>
    <span>Stock: {details.stock}</span>
    <p>Description: {details.description}</p>
    
  </div>;
}

export default Details;
