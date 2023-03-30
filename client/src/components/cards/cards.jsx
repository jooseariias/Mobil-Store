import { useSelector } from "react-redux";

function Cards() {
  const phones = useSelector((state) => state.Phones);

  const availablesPhones = phones.filter((phone) => phone.enabled === true);

  console.log(phones);

  return (
    <>
      <div>
        {availablesPhones &&
          availablesPhones.map((phone) => {
            return (
              <div key={phone.id}>
                <img src={phone.image} alt={phone.name} />
                <p>Model: {phone.name}</p>
                <p>Price: ${phone.price}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Cards;
