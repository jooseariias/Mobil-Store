import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";

import Header from "../Header/Header";

function Details() {
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  console.log(details);
  return (
    <div className="bg-gray-100 h-full">

      <div>
          <Header/>
      </div>

      <div className="flex min-height-full justify-center ">

        <div className="hidden lg:block relative h-full bg-white">
            <img  class='w-[550px] object-cover border-white p-0 m-20' src={details.image} alt={details.name} />
        </div>

        <div className="justify-center flex-1 flex flex-col py-10 px-0 sm:px-8 lg:px-20 sm:py-9 md:py-9  xl:px-24 ">

            <h1 class='mt-6 text-3xl font-extrabold ' >{details.name}</h1>
          
            <span className= 'mt-6 text-2xl font-extrabold '>Price: ${details.price}</span>
            {/* <span className="mt-6 text-2xl font-bold ">Stock: {details.stock}</span> */}
            <p className="my-6 text 2x1 font-bold">Description: {details.description}</p>

        </div>



      </div>

    </div>
  );
}

export default Details;
