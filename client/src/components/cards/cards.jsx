import { useNavigate } from "react-router-dom";

function Cards({ id, name, image, price }) {

  // const availablesPhones = phones.filter((phone) => phone.enabled === true);
  const navigate = useNavigate();


  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  
  return (
    <>
      <div>
        <img src={image} alt={name} />
        <button onClick={() => handleClick(id)}>+ Details</button>
        <p>Model: {name}</p>
        <p>Price: ${price}</p>
      </div>
    </>
  );
}

export default Cards;
