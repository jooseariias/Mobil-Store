import React from "react";

export default function CardDashBoard({image, name, surname , email ,  rol}){

    return(
        <div class='flex text-center bg-white items-center justify-around py-[10px] pt-[10px] w-[1000px] m-4'>

        <div class='w-[200px] bg-white'>
        <h5 class='mr-[100px] text-[15px] w-[200px] font-bold'>{name}</h5>
        <h5 class='text-[12px] font-bold'>{surname}</h5>
        </div>
        
        <div class='w-[200px] bg-white '>
        <h5 class='mr-[100px] text-[15px] w-[200px] text-black font-bold'>{email}</h5>
        </div>

        <div class='w-[200px] bg-white'>
        <h5 class='mr-[100px] text-[15px] w-[200px] font-bold'>{rol}</h5>
        </div>

        {/* <button className="item-center justify-between flex" onClick={() => DeleteUser(e.id) }>
        <img  class= " z-9  my-auto h-8 m-7 text-center item-center justify-center"src = {Delete}/>
        </button>

        <button className="item-center justify-between flex" onClick={() => AdminUser(e.id)} >
        <img  class= " z-9  my-auto h-8 m-7 text-center item-center justify-center"src = {Admin}/>
        </button>

        <button className="item-center justify-between flex" onClick={() => BanUser(e.id)} >
        <img  class= " z-9  my-auto h-8 m-7 text-center item-center justify-center"src = {Ban}/>
        </button> */}


    </div> 
    )
}