import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCapacity, getDetail, cleanDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./details.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import atras from "../../assets/atras.png"
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
    <div className="bg-gray-100 h-full dark:bg-gray-800 dark:bg-gray-900">
      <div>
        <Header />
      </div>
      <div className="cont-back">
        <div><h3 className="Models dark:text-slate-200  ">Model:{details?.name}</h3></div>
        <Link
          to={"/Store"}
          className="button-back"
        >  <img className="icono-atras" src={atras} alt="img" />
         
        </Link>
      </div>

      <div className="contenedor-detail">
        <div className="flex min-height-full justify-center ">
          <div className="hidden lg:block relative h-full bg-white">
            <div className="image-container">
              <img
                className="image-zoom w-[550px] object-cover border-white p-0 m-20"
                src={details?.image}
                alt={details?.name}
              />
            </div>
          </div>

          <div className="justify-center flex-1 flex flex-col py-10 px-0 sm:px-8 lg:px-20 sm:py-9 md:py-9  xl:px-24 ">
            <h1 class="mt-6 text-3xl font-extrabold m-4 dark:text-white">
              {details?.name}
            </h1>
            {details?.stock > 0 ? (
              <p className="text-green-500 font-bold mt-6 m-4 dark:text-green-300">
                In stock
              </p>
            ) : (
              <p className="text-red-500 font-bold mt-6 m-4 dark:text-red-300">
                Out of stock
              </p>
            )}

            <span className="mt-6 text-2xl font-extrabold m-4 dark:text-gray-300">
              ${details?.price}
            </span>

            <p className="my-6 text 2x1 leading-loose font-bold m-4 dark:text-gray-400 ">
               {details?.description}
              <h3>Color Disponible:</h3>
              <div
                className="w-7 h-7 rounded-full m-4"
                style={{ backgroundColor: details?.color?.color }}
              ></div>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Details;
