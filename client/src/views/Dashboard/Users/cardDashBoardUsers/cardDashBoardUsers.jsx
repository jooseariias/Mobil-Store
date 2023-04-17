import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetUsers,
  PutUserAdminDashBoard,
  PutUserBanDashBoard,
} from "../../../../redux/actions/index";
import PaginationUsers from "../PaginationUser/PaginationUser";
import admin from "../../../../assets/icons-user-dashboard/admin.png";
import ban from "../../../../assets/icons-user-dashboard/ban.png";
import Swal from "sweetalert2";

export default function CardDashBoard() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.Users);

  const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const quantity = 9;
  const usersDisplayed = allUsers.slice(start, start + quantity);

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);

  const AdminUser = (id) => {
    dispatch(PutUserAdminDashBoard(id))
      .then((resp) => {
        Swal.fire({
          icon: "sucess",
          title: resp.data.message,
          text: "changed user role!",
        });
      })
      .then(() => {
        dispatch(GetUsers());
      });
  };

  const BanUser = (id) => {
    dispatch(PutUserBanDashBoard(id))
      .then((resp) => {
        Swal.fire({
          icon: "sucess",
          title: resp.data.message,
          text: "has banned the user!",
        });
      })
      .then(() => {
        dispatch(GetUsers());
      });
  };

<<<<<<< HEAD
  return (
    <div>
      <div class="flex flex-wrap justify-center">
        {usersDisplayed?.map((e) => {
          return (
            <div class="flex text-center bg-white items-center justify-around py-[10px] pt-[10px] w-[1000px]">
              <div class="w-[200px] bg-white">
                <h5 class="mr-[100px] text-[15px] w-[200px] font-bold">
                  {e.name}
                </h5>
                <h5 class="text-[12px] font-bold">{e.surname}</h5>
              </div>
=======
        dispatch(PutUserAdminDashBoard( id)).then((resp) => {
            Swal.fire({
                icon: 'sucess',
                title: resp.data.message,
                text: 'User role changed successfully!',
        })
        }).then(() => {
            dispatch(GetUsers());
        })
     
    }
>>>>>>> 625a67c672f2b035f83d0adc208f28f53021d418

              <div class="w-[200px] bg-white ">
                <h5 class="mr-[100px] text-[15px] w-[200px] text-black font-bold">
                  {e.email}
                </h5>
              </div>

<<<<<<< HEAD
              <div class="w-[200px] bg-white">
                <h5 class="mr-[100px] text-[15px] w-[200px] font-bold">
                  {e.rol}
                </h5>
              </div>
=======
        dispatch(PutUserBanDashBoard( id)).then((resp) => {
            Swal.fire({
                icon: 'sucess',
                title: resp.data.message,
                text: 'User enablement changed successfully!',
        })
        }).then(() => {
            dispatch(GetUsers());
        })
>>>>>>> 625a67c672f2b035f83d0adc208f28f53021d418

              <div class="w-[200px] bg-white">
                {e.enabled === true ? (
                  <h5 class="mr-[100px] text-[15px] w-[200px] font-bold">
                    enabled
                  </h5>
                ) : (
                  <h5 class="mr-[100px] text-[15px] w-[200px] font-bold">
                    {" "}
                    disabled
                  </h5>
                )}
              </div>

<<<<<<< HEAD
              <button
                className="item-center justify-between flex"
                onClick={() => AdminUser(e.id)}
              >
                <img
                  class=" z-9  my-auto h-8 m-7 text-center item-center justify-center"
                  src={admin}
                />
              </button>

              <button
                className="item-center justify-between flex"
                onClick={() => BanUser(e.id)}
              >
                <img
                  class=" z-9  my-auto h-8 m-7 text-center item-center justify-center"
                  src={ban}
                />
              </button>
            </div>
          );
        })}
      </div>

      <PaginationUsers
        quantity={quantity}
        start={start}
        setStart={setStart}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
=======
    return(
        <div className="min-h-full flex flex-col">

                    <div class=' justify-center my-2'>
    
                            <div class='flex text-center bg-white items-center justify-around py-[10px] pt-[10px] w-[1000px] '>

                            <div class='w-[200px] bg-white items-center justify-center '>
                            <h5 class='mr-[100px] text-[15px] w-[200px] font-bold'>Name</h5>
                            </div>
                            
                            <div class='w-[200px] bg-white justify-center items-center'>
                            <h5 class='mr-[100px] text-[15px] w-[200px] text-black font-bold'>Email</h5>
                            </div>

                            <div class='w-[150px] bg-white justify-center items-center'>
                            <h5 class='mr-[100px] text-[15px] w-[150px] font-bold'>Rol</h5>
                            </div>

                            <div class='w-[150px] bg-white justify-center items-center '>
                            <h5 class='mr-[100px] text-[15px] w-[150px] font-bold'> Qualification</h5>
                            </div>

                            <div class='w-[80px] bg-white justify-center items-center '>
                            <h5 class='mr-[80px] text-[15px] w-[20px]  font-bold'> Assign Role</h5>
                            </div>

                            <div class='w-[80px] bg-white justify-center items-center px-0'>
                            <h5 class='mr-[80px] text-[15px] w-[20px] font-bold'> assign enablement</h5>
                            </div>


                             </div>
                 

                    </div> 

                    <div class=' justify-center mb-auto'>
                     {usersDisplayed?.map((e) => {
                            return(
                            <div class='flex text-center bg-white items-center justify-around py-[10px] pt-[10px] w-[1000px]'>
                            <div class='w-[200px] bg-white justify-center items-center'>
                            <h5 class='mr-[100px] text-[15px] w-[200px] font-bold'>{e.name}</h5>
                            <h5 class='text-[12px] font-bold'>{e.surname}</h5>
                            </div>
                            
                            <div class='w-[200px] bg-white justify-center items-center'>
                            <h5 class='mr-[100px] text-[15px] w-[200px] text-black font-bold'>{e.email}</h5>
                            </div>

                            <div class='w-[150px] bg-white justify-center items-center'>
                            <h5 class='mr-[100px] text-[15px] w-[150px] font-bold'>{e.rol}</h5>
                            </div>

                            <div class='w-[150px] bg-white justify-center items-center '>
                            {e.enabled === true ? <h5 class='mr-[100px] text-[15px] w-[150px] font-bold'>enabled</h5> : <h5 class='mr-[100px] text-[15px] w-[200px] font-bold'> disabled</h5>}
                            </div>

                            <button className="item-center justify-center items-center flex " onClick={() => AdminUser(e.id)} >
                            <img  class= " z-9  my-auto h-8 m-7 text-center item-center justify-center"src = {admin}/>
                            </button>

                            <button className="justify-center items-center flex" onClick={() => BanUser(e.id)} >
                            <img  class= " z-9  my-auto h-8 m-7 text-center item-center justify-center"src = {ban}/>
                            </button>


                             </div>
                        )
                        })} 

                    </div> 



                    <div className="my-auto ">
                    <PaginationUsers
                        quantity={quantity}
                        start={start}
                        setStart={setStart}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    </div>


        </div>
    )
}
>>>>>>> 625a67c672f2b035f83d0adc208f28f53021d418
