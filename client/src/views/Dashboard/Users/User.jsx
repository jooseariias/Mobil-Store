import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetUsers } from "../../../redux/actions/index";
import CardDashBoard from "./cardDashBoardUsers/cardDashBoardUsers";
import SideBar from "../SideBar/SideBar";
import PaginationUsers from "./PaginationUser/PaginationUser";
import SearchBarUsers from "./SearchBarUsers/SearchBarUsers";

export default function UsersDashBoard() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.Users);

  // const [start, setStart] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  // const quantity = 9;
  // const usersDisplayed = allUsers.slice(start, start + quantity );

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);

<<<<<<< HEAD
  return (
    <div class="grid grid-cols-6 min-h-screen overflow-y-hidden bg-gray-100">
      <div class="col-span-1 bg-slate-400 text-center w-full">
        <SideBar />
      </div>

      <div class="col-span-5 items-center relative">
        <div class="mx-[30px] mt-[20px] bg-white mb-[20px] p-[10px] rounded flex items-center">
          <h1 class="font-bold ml-[10px] text-[25px]">DashBoard Users Admin</h1>
          <div className="items-center justify-center m-2 px-80">
            <SearchBarUsers />
          </div>
        </div>

        <div class="flex text-center bg-white items-center justify-center mx-80 flex-wrap w-[1000px] px-40">
          {/* {usersDisplayed?.map((e) => {
                    return (
                        <CardDashBoard
                        key={e.id}
                        name={e.name}
                        surname={e.surname}
                        email={e.email}
                        rol={e.rol}
                        enabled={e.enabled}
                        />
                        );
                    })} */}
          <CardDashBoard />
=======
    useEffect(() => {
        dispatch(GetUsers());
      }, [dispatch]); 

    return(
        <div class='grid grid-cols-6 min-h-screen overflow-y-hidden bg-gray-100'>
             <div class='col-span-1 bg-slate-400 text-center w-full'>
                 <SideBar/>
            </div>

            <div class='col-span-5 items-center relative'>
                <div class='mx-[30px] mt-[20px] bg-white mb-[20px] p-[10px] rounded flex items-center'>
                    <h1 class='font-bold ml-[10px] text-[25px]'>Users</h1> 
                   <div className="items-center justify-center m-4 px-60 m-4 w-full"> <SearchBarUsers/> </div>   
                </div>

                <div class='flex text-center bg-white items-center justify-center mx-80  w-[1000px]   h-full px-40'>
             
                    <CardDashBoard/>

                </div>


            </div>


>>>>>>> 625a67c672f2b035f83d0adc208f28f53021d418
        </div>
      </div>
    </div>
  );
}
