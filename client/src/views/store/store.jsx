import React, { useState } from 'react'
import Cards from "../../components/cards/cards";
import { useDispatch , useSelector} from "react-redux";
import {  TidyAlphabetically , TidyPrice , TidyReleased, FilterBrands} from "../../redux/actions/index"
import { useEffect } from 'react'




export default function Store(){

    const[order,setOrder] =useState('') 
    const dispatch = useDispatch();

    const phones = useSelector((state) => state.PhonesCopy);
    const Allbrand = useSelector((state) => state.Brands);

    const handleFilterTidy = (e) => {
        dispatch(TidyAlphabetically(e.target.value))
        setOrder(`ordenado ${e.target.value}`)
    }

    const handleFilterTidyPrice = (e) => {
        dispatch(TidyPrice(e.target.value))
        setOrder(`ordenado ${e.target.value}`)
    }

    const handleFilterTidyReleased = (e) => {
        dispatch(TidyReleased(e.target.value))
        setOrder(`ordenado ${e.target.value}`)
    }

    const  HandlerFilterTypeFerBrands = (e) =>{
        e.preventDefault();
        dispatch(FilterBrands(e.target.value))
        setOrder(`ordenado ${e.target.value}`)
      }

    return(

        <div>
            <div>
            <select
              className="px-3 bg-gray-300 text-black py-3 rounded-xl border-2 border-white text-xl text-center  "
              onChange={(e) => handleFilterTidy(e)}
            >
              <option selected hidden>
                Alphabetic
              </option>
              <option value="asc"> A to Z </option>
              <option value="descendente">Z to A</option>
            </select>

            <select
              className="px-3 bg-gray-300 text-black py-3  rounded-xl border-2 border-white text-xl text-center "
              onChange={(e) => handleFilterTidyPrice(e)}
            >
              <option selected hidden>
                Price
              </option>
              <option value="min"> Minor to Major Price </option>
              <option value="Maximo">Major to Minor Price</option>
            </select>

           
            {/* <select
              className="px-3 bg-gray-300 text-black py-3 rounded-xl border-2 border-white text-center text-xl "
              onChange={HandlerFilterTypeFerBrands}
            >
              <option selected hidden value="all">
                All Phones
              </option>
              {Allbrand?.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select> */}

            
        
            <select
              className="px-3 bg-gray-300 text-black py-3 rounded-xl border-2 border-white text-xl text-center "
              onChange={(e) => handleFilterTidyReleased(e)}
            >
              <option selected hidden>
                Released
              </option>
              <option value="asc"> recent </option>
              <option value="descendente"> oldest recent</option>
            </select>


            </div>
            {phones?.map((el, index) => {
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
    )


}
