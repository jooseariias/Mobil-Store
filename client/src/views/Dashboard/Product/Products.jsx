import React from "react";
import SideBar from "../SideBar/SideBar";


export default function ProductDashBoard(){

  return(
    <div class='grid grid-cols-6 min-h-screen overflow-y-hidden bg-gray-100'>
           <div class='col-span-1 bg-slate-400 text-center w-full'>
                 <SideBar/>
            </div>
    </div>
  )

}

