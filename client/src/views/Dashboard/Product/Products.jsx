import { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../../Pagination/pagination";
import Header from "../../../components/Header/Header";

function Products() {

  const [start, setStart] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const quantity = 5;
  const products = useSelector(state => state.Phones)
  const slicedProducts = products.slice(start, start + quantity)

  const productList = slicedProducts?.map((product) => {
    return (
      <div key={product.id} className="w-1/2 p-2 flex items-center justify-around bg-gray-300 font-semibold rounded-md">
        <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center"><img src={product.image} className="w-[70px] h-[70px] rounded-full"/></div>
        <span>{product.name}</span>
        <span>${product.price}</span>
        <span>{product.color.color}</span>
        <span>{product.storageCapacity.capacity}GB</span>
        <span>{product.stock}</span>
      </div>
    );
  });
  
  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-800">
      <div><Header /></div>
      <h1 className=" w-full text-center text-3xl p-4 dark:text-white">Products stock</h1>
      <div className="w-full p-5 flex flex-col items-center gap-8 dark:bg-gray-900">{productList}</div>
      <Pagination 
      quantity={quantity}
      start={start}
      setStart={setStart}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      />
    </div>
    
  );
}

export default Products;
