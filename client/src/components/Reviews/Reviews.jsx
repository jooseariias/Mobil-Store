import React from 'react'
import {useDispatch,useSelector} from "react-redux"
import  { useState, useEffect } from 'react';
import { getReviews } from '../../redux/actions/index';
import { useParams } from "react-router-dom";
import {StarRating } from './Star';
import "../Reviews/reviews.css"
export const Reviews = () => {

    const dispatch = useDispatch()
    const reviews = useSelector(state=>state.Reviews)
    let Promedio=0
    const { id } = useParams();
    useEffect(() => {
        dispatch(getReviews(id))
    }, []);
    
    if(!reviews.length){
        return <p className='msg'>Este producto no tiene reseñas</p>
    }
  /*    function PromedioFun() {
        Promedio = reviews.reduce((prev, current) => prev + current.score, 0) / reviews.length;
               
        const num = Promedio;
        const decimalPart = num % 1;
        const roundedDecimalPart = decimalPart.toFixed(2);
        // console.log(roundedDecimalPart); // Output: 0.14
        if(roundedDecimalPart > 0.5){
           Promedio = Math.ceil(Promedio)
        }else if(roundedDecimalPart < 0.5) {
           Promedio = Math.floor(Promedio)
        }
       console.log(Promedio)
    };
    PromedioFun() */
      return (
        <>
        <h3 className='tituloRes'>Opiniones del producto</h3>
        <div className='contenedorRev '>
            {console.log("resenas", reviews)}
       {/*  <div className='prom'>
        <span>{Promedio}</span> <StarRating score={Promedio} /> 
        </div> */}
              <div className="fecha">
            {
                reviews?.map(r=>{
                    return(
                        <p key={r.id}>{r.date.slice(0,10)}</p>
    
                    )
                })
             }
            </div>
            <div className="estrellas">
             {
                reviews?.map(r=>{
                    return (
                        <StarRating score={r.score} />
                    )
                })
             }
            </div>
            <div className="comentarios">
            {
                reviews?.map(r=>{
                    return(
                        <p key={r.id}>{r.comment}</p>
    
                    )
                })
             }
            </div>
        </div>
        </>
      )
}
