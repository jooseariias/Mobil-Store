import React,{useState,useEffect} from "react";
import SideBar from "../SideBar/SideBar";
import { useDispatch,useSelector } from "react-redux";
import { getAllOrders } from "../../../redux/actions";
import CardOrders from "./CardOrders/CardOrders";

export default function Orders(){
    const dispatch = useDispatch()
    useEffect(() => {
    dispatch(getAllOrders())
    }, [])


    return(

        <div class='grid grid-cols-6 min-h-screen overflow-y-hidden'>
            <div class='col-span-1 bg-slate-400 text-center w-full'>
                 <SideBar/>
            </div>  

            <div class='flex text-center bg-white items-center justify-center mx-20  w-[1000px]   h-full px-40'>
             
             <CardOrders/>

         </div>  
        </div>
    )

}