import React, { useState } from 'react'
import Cards from "../../components/cards/cards";
import { useDispatch , useSelector} from "react-redux";
import {  TidyAlphabetically , TidyPrice , TidyReleased, FilterBrands, getBrands, getPhones, CleanPhones} from "../../redux/actions/index"
import { useEffect } from 'react'
import Header from '../../components/Header/Header';




export default function Store(){

    const[order,setOrder] =useState('') 
    const dispatch = useDispatch();

    const phones = useSelector((state) => state.PhonesCopy);
    const Allbrand = useSelector((state) => state.Brands);

    useEffect(() => {
      dispatch(getPhones());
      dispatch(getBrands());
  }, [dispatch])

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


    const handleClick = (e) => {
      e.preventDefault();
      dispatch(CleanPhones(dispatch))
      dispatch(GetGames())
    }

    return(

        <div className='bg-gray-100'>

            <div>
              <Header/>
            </div>

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

            {/* <select
              className="px-3 bg-gray-300 text-black py-3  rounded-xl border-2 border-white text-xl text-center "
              onChange={(e) => handleFilterTidyPrice(e)}
            >
              <option selected hidden>
                Price
              </option>
              <option value="min"> Minor to Major Price </option>
              <option value="Maximo">Major to Minor Price</option>
            </select> */}

           
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
              <option value="asc"> oldest </option>
              <option value="descendente">  recent</option>
            </select>

            {/* <button onClick={e => {handleClick(e)}} className="px-3 bg-gray-300 text-black py-3  rounded-xl border-2 border-white text-xl text-center hover:bg-transparent hover:text-white">Clear Filters</button> */}


            </div>

              <div className='grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mx-10 mt-5 mb-4'>
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
        </div>
    )


}
