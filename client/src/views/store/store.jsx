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
  FilterCapacity,
  getPhones
} from "../../redux/actions/index";
import Header from "../../components/Header/Header";
import Pagination from "../Pagination/pagination";

export default function Store() {
  const [order, setOrder] = useState("");
  const dispatch = useDispatch();

  const phones = useSelector((state) => state.PhonesCopy);
  const Allbrand = useSelector((state) => state.Brands);
  const AllCap = useSelector((state) => state.Capacity);
  const breadcrumb = useSelector((state) => state.ArrayFilters);

  const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const quantity = 10;
  const phonesDisplayed = phones.slice(start, start + quantity + 2);

  const handleFilterTidy = (e) => {

    e.preventDefault();

    dispatch(TidyAlphabetically(e.target.value));
    setOrder(`ordenado ${e.target.value}`);
    setStart(0);
    setCurrentPage(1);
  };

  const handleFilterTidyPrice = (e) => {

    e.preventDefault();

    dispatch(TidyPrice(e.target.value));
    setOrder(`ordenado ${e.target.value}`);
    setStart(0);
    setCurrentPage(1);
  };

  const handleFilterTidyReleased = (e) => {

    e.preventDefault();

    dispatch(TidyReleased(e.target.value));
    setOrder(`ordenado ${e.target.value}`);
    setStart(0);
    setCurrentPage(1);
  };

  const HandlerFilterTypeFerBrands = (e) => {

    e.preventDefault();

    const payload = {
      info: e.target.value,
      type: 'Brands'
    }

    dispatch(FilterBrands(payload));
    setOrder(`ordenado ${e.target.value}`);
    setStart(0);
    setCurrentPage(1);
  };

  const HandlerFilterTypeFercapabilities = (e) => {

    e.preventDefault();

    const payload = {
      info: e.target.value,
      type: 'Capabitlies'
    }

    dispatch(FilterCapacity(payload));
    setOrder(`ordenado ${e.target.value}`);
    setStart(0);
    setCurrentPage(1);
  };

  const handleClick = (e) => {

    e.preventDefault();

    dispatch(CleanPhones(dispatch));
    dispatch(getPhones());
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800">

      <div>
        <Header />
      </div>

      <nav aria-label="breadcrumb" className="w-full p-4 ml-3 dark:bg-gray-800 dark:text-gray-100">
	      <ol className="flex space-x-2">
        <li className="flex items-center">
			      <a rel="noopener noreferrer" href="#" title="Back to homepage" className="hover:underline">
				      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 pr-1 dark:text-gray-400">
					      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
				      </svg>
			      </a>
		      </li>

          <li className="flex items-center space-x-2">
			            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor" className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600">
				            <path d="M32 30.031h-32l16-28.061z"></path>
			             </svg>
			            <a rel="noopener noreferrer" href="#" className="flex items-center px-1 capitalize hover:underline">Filters</a>
		            </li>

          

          {
            breadcrumb?.map((element) => {
              return (
		            <li className="flex items-center space-x-2">
			            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor" className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600">
				            <path d="M32 30.031h-32l16-28.061z"></path>
			             </svg>
			            <a rel="noopener noreferrer" href="#" className="flex items-center px-1 capitalize hover:underline">{element}</a>
		            </li>
              )
            })
          }
	    </ol>
    </nav>

      <div className="flex justify-between flex-wrap mt-4 mx-10">
        
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
