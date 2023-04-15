import { useState } from "react";
import Card from "../../components/Carrucel/Card";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  TidyAlphabetically,
  TidyPrice,
  TidyReleased,
  FilterBrands,
  CleanPhones,
  FilterCapacity
} from "../../redux/actions/index";
import Header from "../../components/Header/Header";
import Pagination from "../Pagination/pagination";

export default function Store() {
  const [order, setOrder] = useState("");
  const dispatch = useDispatch();

  const phones = useSelector((state) => state.PhonesCopy);
  const Allbrand = useSelector((state) => state.Brands);
  const AllCap = useSelector((state) => state.Capacity);

  const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const quantity = 10;
  const phonesDisplayed = phones.slice(start, start + quantity + 2);

  const handleFilterTidy = (e) => {
    dispatch(TidyAlphabetically(e.target.value));
    setOrder(`ordenado ${e.target.value}`);
    setStart(0);
    setCurrentPage(1);
  };

  const handleFilterTidyPrice = (e) => {
    dispatch(TidyPrice(e.target.value));
    setOrder(`ordenado ${e.target.value}`);
    setStart(0);
    setCurrentPage(1);
  };

  const handleFilterTidyReleased = (e) => {
    dispatch(TidyReleased(e.target.value));
    setOrder(`ordenado ${e.target.value}`);
    setStart(0);
    setCurrentPage(1);
  };

  const HandlerFilterTypeFerBrands = (e) => {
    e.preventDefault();
    dispatch(FilterBrands(e.target.value));
    setOrder(`ordenado ${e.target.value}`);
    setStart(0);
    setCurrentPage(1);
  };

  const HandlerFilterTypeFercapabilities = (e) => {
    dispatch(FilterCapacity(e.target.value));
    setOrder(`ordenado ${e.target.value}`);
    setStart(0);
    setCurrentPage(1);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(CleanPhones(dispatch));
    dispatch(GetGames());
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800">

      <div>
        <Header />
      </div>

      <div className="flex justify-between flex-wrap mt-8 mx-10">

        <select id="brands" className="w-48 bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-md rounded-lg  p-2.5
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
          shadow-md shadow-gray-400 cursor-pointer focus:outline-none" onChange={(e) => HandlerFilterTypeFerBrands(e)}>
          <option selected value="all">Filter by brands</option>
            {Allbrand?.map((value, index) => (
              <option index={index} value={value.name}>
                {value.name}
              </option>
            ))}
        </select>

        <select id="capabilities" className="w-48 bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-md rounded-lg  p-2.5
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
          shadow-md shadow-gray-400 cursor-pointer focus:outline-none" onChange={(e) => HandlerFilterTypeFercapabilities(e)}>
          <option selected value="all">Filter by capabitilies</option>
            {AllCap?.map((value, index) => (
              <option index={index} value={value.capacity}>
                {value.capacity} GB
              </option>
            ))}
        </select>

        <select id="alphabetically" className="w-48 bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-md rounded-lg  p-2.5
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
          shadow-md shadow-gray-400 cursor-pointer focus:outline-none" onChange={(e) => handleFilterTidy(e)}>
            <option selected value="all">Order alphabetically</option>
            <option value="asc">A - Z</option>
            <option value="descendente">Z - A</option>
        </select>

        <select id="price" className="w-48 bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-md rounded-lg  p-2.5
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
          shadow-md shadow-gray-400 cursor-pointer focus:outline-none" onChange={(e) => handleFilterTidyPrice(e)}>
            <option selected value="all">Order by price</option>
            <option value="min">Minor to Major</option>
            <option value="Maximo">Major to Minor</option>
        </select>

        <select id="released" className="w-48 bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-md rounded-lg  p-2.5
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
          shadow-md shadow-gray-400 cursor-pointer focus:outline-none" onChange={(e) => handleFilterTidyReleased(e)}>
            <option selected value="all">Order by released</option>
            <option value="descendente">Recent</option>
            <option value="asc">Oldest</option>
        </select>

        <button onClick={(e) => {handleClick(e)}} className="w-48 bg-gray-100 border border-gray-300 text-gray-900 font-semibold text-md rounded-lg  p-2.5
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
          shadow-md shadow-gray-400 cursor-pointer focus:outline-none">
          Clear Filters
        </button>

      </div>

      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mx-10 mt-5 mb-4">
        {phonesDisplayed?.map((e) => {
          return (
            <Card
              key={e.id}
              id={e.id}
              image={e.image}
              name={e.name}
              price={e.price}
              brand={e.brand}
              color={e.color}
              stock={e.stock}
            />
          );
        })}
      </div>

      <Pagination
        quantity={quantity}
        start={start}
        setStart={setStart}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </div>
  );
}
