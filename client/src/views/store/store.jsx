import React, { useState } from "react";
import Cards from "../../components/cards/cards";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  TidyAlphabetically,
  TidyPrice,
  TidyReleased,
  FilterBrands,
  getBrands,
  getPhones,
  CleanPhones,
  FilterCapacity,
  getCapacity,
} from "../../redux/actions/index";
import { useEffect } from "react";
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
  const phonesDisplayed = phones.slice(start, start + quantity);

  useEffect(() => {
    dispatch(getPhones());
    dispatch(getBrands());
    dispatch(getCapacity());
  }, [dispatch]);

  const handleFilterTidy = (e) => {
    dispatch(TidyAlphabetically(e.target.value));
    setOrder(`ordenado ${e.target.value}`);
    setStart(0);
    setCurrentPage(1);
  };

  console.log(AllCap);
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
    <div className="bg-gray-100">
      <div>
        <Header />
      </div>

      <div className="flex justify-between flex-wrap px-0 mt-2 mx-4">
        <select
          className="px-1 bg-gray-300 text-black py-3 rounded-xl border-2 border-white text-xl text-center  "
          onChange={(e) => handleFilterTidy(e)}
        >
          <option selected hidden>
            Alphabetic
          </option>
          <option value="asc"> A to Z </option>
          <option value="descendente">Z to A</option>
        </select>

        <select
          className="px-1 bg-gray-300 text-black py-3  rounded-xl border-2 border-white text-xl text-center "
          onChange={(e) => handleFilterTidyPrice(e)}
        >
          <option selected hidden>
            Price
          </option>
          <option value="min"> Minor to Major Price </option>
          <option value="Maximo">Major to Minor Price</option>
        </select>

        <select
          className="px-1 bg-gray-300 text-black py-3 rounded-xl border-2 border-white text-center text-xl "
          onChange={(e) => HandlerFilterTypeFerBrands(e)}
        >
          <option selected hidden value="all">
            All Phones
          </option>
          {Allbrand?.map((value, index) => (
            <option index={index} value={value.name}>
              {value.name}
            </option>
          ))}
        </select>

        <select
          className="px-1 bg-gray-300 text-black py-3 rounded-xl border-2 border-white text-center text-xl "
          onChange={(e) => HandlerFilterTypeFercapabilities(e)}
        >
          <option selected hidden value="all">
            All capabilities
          </option>
          {AllCap?.map((value, index) => (
            <option index={index} value={value.capacity}>
              {value.capacity}
            </option>
          ))}
        </select>

        <select
          className="px-1 bg-gray-300 text-black py-3 rounded-xl border-2 border-white text-xl text-center "
          onChange={(e) => handleFilterTidyReleased(e)}
        >
          <option selected hidden>
            Released
          </option>
          <option value="asc"> oldest </option>
          <option value="descendente"> recent</option>
        </select>

        <button
          onClick={(e) => {
            handleClick(e);
          }}
          className="px-3 bg-gray-300 text-black py-3  rounded-xl border-2 border-white text-xl text-center hover:bg-transparent hover:text-white"
        >
          Clear Filters
        </button>
      </div>

      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mx-10 mt-5 mb-4">
        {phonesDisplayed?.map((el) => {
          return (
            <Cards
              key={el.id}
              id={el.id}
              image={el.image}
              name={el.name}
              price={el.price}
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
