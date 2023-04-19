import React from "react";
import SideBar from "./SideBar/SideBar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getTotalOrders} from "../../redux/actions/index"



export default function Dashboard(){

    const dispatch = useDispatch();
    const allStatisticsTotal = useSelector((state) => state.StatisticsTotal);

    useEffect(() => {
        dispatch(getTotalOrders());
      }, [dispatch]); 


    return(

        <div class='grid grid-cols-6 min-h-screen overflow-y-hidden bg-gray-100'>
            <div class='col-span-1 bg-slate-400 text-center w-full'>
                 <SideBar/>
            </div>  

            <div class='col-span-5 items-center relative'>
                <div class='mx-[30px] mt-[20px] bg-white mb-[20px] p-[10px] rounded flex items-center'>
                        <h1 class='font-bold ml-[10px] text-[25px]'>Statistics</h1> 
                </div>

                <div class='flex text-center bg-white items-center justify-center mx-40  w-[1000px]   h-full px-40'>
                        {allStatisticsTotal.data?.map((e) => {
                            return(
                             <div>
                                <h1>Las ventas en el ultimo año son {e.count} </h1>
                            </div>
                                )
                         })} 
                </div>
            </div>
        </div>
    )

}