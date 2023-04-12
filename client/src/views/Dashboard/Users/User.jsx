import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {GetUsers} from "../../../redux/actions/index"
import CardDashBoard from "./cardDashBoardUsers/cardDashBoardUsers";


export default function UsersDashBoard(){

    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.Users);

    useEffect(() => {
        dispatch(GetUsers());
      }, [dispatch]); 

    return(
        <div class='grid grid-cols-6 min-h-screen overflow-y-hidden'>
             <div class='col-span-1 bg-slate-400 text-center w-full'>
                 <SideBar/>
            </div>

            <div class='col-span-5 items-center relative'>
                <div class='mx-[30px] mt-[20px] bg-white mb-[20px] p-[10px] rounded flex items-center'>
                    <h1 class='font-bold ml-[10px] text-[25px]'>DashBoard Users Admin</h1>     
                </div>

                <div class='flex text-left bg-white items-center justify-around py-[10px] mt-[10px] flex-wrap w-[1000px]'>
                
                    {allUsers?.map((e) => {
                    return (
                        <CardDashBoard
                        key={e.id}
                        image={e.image}
                        name={e.name}
                        last_name={e.last_name}
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