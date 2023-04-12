import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {GetUsers} from "../../../redux/actions/index"
import CardDashBoard from "./cardDashBoardUsers/cardDashBoardUsers";
import SideBar from "../SideBar/SideBar";


export default function UsersDashBoard(){

    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.Users);

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
                    <h1 class='font-bold ml-[10px] text-[25px]'>DashBoard Users Admin</h1>     
                </div>

                <div class='flex text-center bg-white items-center justify-center mx-80 flex-wrap w-[1000px] px-40'>
                
                    {allUsers?.map((e) => {
                    return (
                        <CardDashBoard
                        key={e.id}
                        image={e.image}
                        name={e.name}
                        surname={e.surname}
                        email={e.email}
                        rol={e.rol}
                        />
                        );
                    })}

                </div>
            </div>


        </div>
    )


}