import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCapacity, getDetail, cleanDetail } from "../../redux/actions";
import { Link } from "react-router-dom";

import Header from "../Header/Header";

function Details() {

  const [details] = useSelector((state) => state.details);
  console.log(details);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, []);

  return (
    <div className="bg-gray-100 h-full dark:bg-gray-800">
      <div>
        <Header />
      </div>
      <div className="flex min-height-full justify-center ">
        <div>
          <Link
            to={"/Store"}
            className="px-2 flex mt-4 ml-4 bg-gray-300 text-black  rounded-xl border-2 border-white text-xl text-center hover:bg-transparent hover:text-white"
          >
            back to store
          </Link>
        </div>

        <div className="hidden lg:block relative h-full bg-white">
          <img
            class="w-[550px] object-cover border-white p-0 m-20"
            src={details?.image}
            alt={details?.name}
          />
        </div>

        <div className="justify-center flex-1 flex flex-col py-10 px-0 sm:px-8 lg:px-20 sm:py-9 md:py-9  xl:px-24 ">
          <h1 class="mt-6 text-3xl font-extrabold m-4 dark:text-white">{details?.name}</h1>

          <span className="mt-6 text-2xl font-extrabold m-4 dark:text-gray-300">
            Price: ${details?.price}
          </span>
          {/* <span className="mt-6 text-2xl font-bold ">Stock: {details.stock}</span> */}
          <p className="my-6 text 2x1 leading-loose font-bold m-4 dark:text-gray-400">
            Description: {details?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Details;
