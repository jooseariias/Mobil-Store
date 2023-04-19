import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, sendOrder } from "../../../../redux/actions/index";
import Swal from "sweetalert2";

const CardOrders = () => {
  const orders = useSelector((state) => state.Orders);
  const dispatch = useDispatch();

  const send = (id) => {
    dispatch(sendOrder(id))
      .then((resp) => {
        Swal.fire({
          icon: "success",
          text: "Order send successfully!",
        });
      })
      .then(() => {
        dispatch(getAllOrders());
      });
  };

  return (
    <div className="min-h-full flex flex-col ">
      <div class=" justify-center item-center">
        <div class="flex text-center bg-white items-center justify-around py-[10px] pt-[10px] w-[1000px] ">
          {/*  <div class="w-[200px] bg-white items-center justify-center m-2">
            <h5 class="mr-[100px] text-[15px] w-[200px] font-bold">Nro:</h5>
          </div> */}

          <div class="w-[150px] bg-white justify-center items-center m-2">
            <h5 class="mr-[100px] text-[15px] w-[100px] text-black font-bold">
              Date
            </h5>
          </div>

          <div class="w-[150px] bg-white justify-center items-center m-2">
            <h5 class="mr-[100px] text-[15px] w-[100px] font-bold ">
              Product Detail
            </h5>
          </div>

          <div class="w-[150px] bg-white justify-center items-center m-2">
            <h5 class="mr-[100px] text-[15px] w-[200px] font-bold"> Address</h5>
          </div>

          <div class="w-[80px] bg-white justify-center items-center m-2">
            <h5 class="mr-[80px] text-[15px] w-[100px]  font-bold"> Total</h5>
          </div>
          <div class="w-[80px] bg-white justify-center items-center m-2">
            <h5 class="mr-[180px] text-[15px] w-[150px]  font-bold"> Status</h5>
          </div>
        </div>
      </div>

      <div class=" justify-center item-center py-[10px] pt-[10px] w-[1000px]">
        {orders?.map((e) => {
          return (
            <div class="flex text-center bg-white items-center justify-around ">
              {/*  <div class='w-[200px] bg-white justify-center items-center m-2'>
            <h5 class='mr-[100px] text-[15px] w-[200px] font-bold'>{e.Nro}</h5> 
            </div> */}
              <div class="w-[200px] bg-white justify-center items-center m-2">
                <h5  class="mr-[100px] text-[15px] w-[200px] text-black font-bold">
                  {e.date.slice(0, 10)}
                </h5>
              </div>
              <div class="w-[350px] bg-white justify-center items-center m-2">
                <h5 class="mr-[150px] text-[15px] w-[300px] text-black font-bold text-left">
                  {e.nameAndQuantity + " "}
                </h5>
              </div>
              <div class="w-[150px] bg-white justify-center items-center m-2">
                <h5 class="mr-[100px] text-[15px] w-[150px] font-bold  text-left">
                  {e.address}
                </h5>
              </div>
              <div class="w-[150px] bg-white justify-center items-center m-2">
                <h5 class="mr-[100px] text-[15px] w-[150px] font-bold">
                  {e.total}
                </h5>
              </div>
              <div class="w-[150px] bg-white justify-center items-center m-2">
                <h5 class="mr-[100px] text-[15px] w-[150px] font-bold">
                  {e.status}
                </h5>
              </div>
              <button
                className=" flex m-2  bg-blue-500 text-white  border border-gray-300 px-2 py-1 text-lg "
                onClick={() => send(e.Nro)}
              >
                Send
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardOrders;
