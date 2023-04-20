import React from "react";
import SideBar from "./SideBar/SideBar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getTotalOrders, getUsersStatistics, LogOut} from "../../redux/actions/index"



export default function Dashboard(){

    const dispatch = useDispatch();
    const allStatisticsTotal = useSelector((state) => state.StatisticsTotal);
    const allStatisticsUsers = useSelector((state) => state.StatisticsUsers);


    useEffect(() => {
        dispatch(getTotalOrders());
        dispatch(getUsersStatistics());
      }, [dispatch]); 

      const handleLogOut = () => {

		Swal.fire({
			icon: 'warning',
			title: 'Do you want to log out?',
			confirmButtonText: 'Yes',
			showDenyButton: true,
		}).then((result) => {
			if(result.isConfirmed){

				dispatch(LogOut());
				navigate('/')

				Swal.fire({
					icon: 'success',
					title: 'The session has been closed'
				})

				setActualizar(!Actualizar);
				
			}})
	  }


    return(

        <div class='grid grid-cols-6 min-h-screen overflow-y-hidden bg-gray-100'>
            <div class='col-span-1 bg-slate-400 text-center w-full'>
                 <SideBar/>
            </div>  

            <div class='col-span-5 items-center relative'>
                <div class='mx-[30px] mt-[20px] bg-white mb-[20px] p-[10px] rounded flex items-center'>
                        <h1 class='font-bold ml-[10px] text-[25px]'>Statistics</h1> 
                </div>

                <div className="items-center justify-center px-40 ">

                    <div class='flex text-center mx-[30px] mt-[20px] bg-white mb-[20px] p-[10px  justify-center items-center  w-[1000px] h-[200px]  px-40'>
                                <div className="flex ">
                                {allStatisticsTotal !== null ? ( <h1 className="w-[400px] font-bold text-2xl px-10 py-4 border border-gray-600 mx-8 h-[170px] rounded-xl my-8 border-4 bg-blue-100 pt-8"> The amount of sales in the last year is: <h2 className="font-bold text-green-500 text-2xl ">{allStatisticsTotal.count}</h2> </h1>  )   : ( <h1>indefined count  </h1>) } 
                                {allStatisticsTotal !== null ? ( <h1 className=" w-[400px] font-bold text-2xl px-10 py-4 border border-gray-600 mx-8 h-[170px] rounded-xl my-8 border-4 bg-blue-100 pt-8"> and the total earned on sales is: <h2 className="font-bold text-green-500 text-2xl">{allStatisticsTotal.total}</h2> </h1>  )   : ( <h1> indefined count total  </h1>) } 
                                </div>
                    </div>

                    <div class='flex text-center mx-[30px] mt-[20px] bg-white mb-[20px] p-[10px  justify-center items-center  w-[1000px] h-[200px]  px-40'>

                                <div className="flex">
                                {allStatisticsUsers !== null ? ( <h1 className=" w-[400px] font-bold text-2xl px-10 py-4 border border-gray-600 mx-8 h-[170px] rounded-xl my-8 border-4 bg-green-100 pt-8"> The number of active users on the page is: <h2 className="font-bold text-green-500 text-2xl ">{allStatisticsUsers.enabled}</h2> </h1>  )   : ( <h1>indefined users enabled  </h1>) } 
                                 {allStatisticsUsers !== null ? ( <h1 className=" w-[400px] font-bold text-2xl px-10 py-4 border border-gray-600 mx-8 h-[170px] rounded-xl my-8 border-4 bg-red-100 pt-8"> The number of users banned from the page is: <h2 className="font-bold text-green-500 text-2xl">{allStatisticsUsers.disabled}</h2> </h1>  )   : ( <h1> indefined users disabled  </h1>) } 
                                </div>
                    </div>

                

                </div>

            </div>
        </div>
    )

}