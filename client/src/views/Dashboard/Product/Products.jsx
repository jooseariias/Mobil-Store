import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Pagination from "../../Pagination/pagination";
import SideBar from "../SideBar/SideBar";

function Products() {
  const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const quantity = 5;
  const products = useSelector((state) => state.Phones);
  const slicedProducts = products.slice(start, start + quantity);
  console.log(products);
  const productList = slicedProducts?.map((product) => {
    return (
      <div
        key={product.id}
        className="w-full p-3 m-3 grid grid-cols-6 items-center gap-10 bg-gray-300 " 
      >
        <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center">
          <img src={product.image} className="w-[70px] h-[70px] rounded-full" />
        </div>
        <span>{product.name}</span>
        <span>${product.price}</span>
        <span>{product.color?.color}</span>
        <span>{product.storageCapacity?.capacity}GB</span>
        <span>{product.stock}</span>
      </div>
    );
  });

  return (
    <div className="flex flex-row overflow-y-hidden">
      <div className="w-96 max-h-screen">
        <SideBar />
      </div>

      <div className="w-full h-screen flex flex-col items-center gap-5">
        
            <div className="w-1/2 p-4"> <SearchBar /></div>
            
          
          <h1 className="text-3xl p-4">Products stock</h1>
          <div className="w-[700px] h-[670px]">
            {productList}
          </div>
          <Pagination
            quantity={quantity}
            start={start}
            setStart={setStart}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        
      </div>

    </div>
  );
}

export default Products;
