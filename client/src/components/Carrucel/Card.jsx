
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Card({img, id, name, price}){
    
    return(
        <div class="w-full max-w-sm mb-10 shadow-xl shadow-slate-700 mr-2 bg-white dark:bg-[#17202A] duration-300">

        <Link to={`/products/${id}`}>
            <img className=" h-[350px] w-full bg-slate-100" src={img} alt="product image" />
        </Link>
    
        <div class="px-2 pb-4 mt-2">
    
            <div>
                <h1 class="ml-1 text-xl font-bold tracking-tight text-gray-900 dark:text-slate-100">{name}</h1>
            </div>
    
            <div class="flex items-center justify-between">
                <span class="text-3xl mt-10 font-bold text-slate-900 dark:text-slate-100">${price}</span>

                {/*<a href="#" class="text-slate-100 bg-blue-600 mt-10 hover:bg-blue-800 focus:ring-4 focus:outline-none
                 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={(e) => AddCart(e)}>Add to Cart</a>*/}
            </div>
        </div>
    </div>
  )
}