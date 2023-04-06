import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react"
import { DeleteProductLocalStorage } from "../../helpers/Cart";
import Swal from "sweetalert2";

export default function Cart(){

  const[carrito, setCarrito] = useState([]);
  const[Actualizar, setActualizar] = useState(false);
  
  useEffect(() => {

    if(window.localStorage.getItem('carrito-db')){

    }

    if(window.localStorage.getItem('carrito-ls')){
      setCarrito(JSON.parse(window.localStorage.getItem('carrito-ls')));
    }
    
  }, [Actualizar])

  const DeleteProduct = (id) => {

    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete the product?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed){
        DeleteProductLocalStorage(id);
        setActualizar(!Actualizar);
        Swal.fire({
          icon: 'success',
          title: 'Congratulations!',
          text: 'The product was deleted',
        })
      }
    })
    
  }

  return(

    <div className="Cart">

      <Header />

    <div class="bg-gray-300">
      <div class="container mx-auto">

        <div class="flex shadow-md py-5">
          <div class="w-3/4 bg-white h-[calc(100vh-8.8rem)] px-10 py-4">

            <div class="flex justify-between border-b pb-5">
              <h1 class="font-semibold text-2xl">Shopping Cart</h1>
              <h2 class="font-semibold text-2xl">{carrito?.quantity} Items</h2>
            </div>

            <div class="flex mt-8 mb-5 justify-between">
              <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5 mr-2">Product Details</h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Stock</h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
              <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 pl-3">Total</h3>
            </div>

            {
             carrito && carrito.productcarts?.map((product) => {
                return (
                <div class="flex items-center hover:bg-gray-100  py-5 border-b">
                  <div class="flex w-2/5"> 
                    <div class="w-20">
                      <img class="h-24" src={product.image} alt="photo" />
                    </div>

                    <div class="flex flex-col justify-between ml-4 flex-grow">
                      <span class="font-bold text-sm">{product.name}</span>
                      <span class="text-red-500 text-xs">Xiaomi</span>
                      <a onClick={() => DeleteProduct(product.id)} class="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer">Remove</a>
                    </div>
                </div>

                  <div class="flex justify-center w-1/5">

                    <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                    </svg>

                    <input class="mx-2 border text-center w-8" type="text" value="1" />

                    <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                    </svg>
                  </div>
          
          <span class="text-center w-1/5 font-semibold text-sm">5</span>
          <span class="text-center w-1/5 font-semibold text-sm">${product.price}.00</span>
          <span class="text-center w-1/5 font-semibold text-sm">${product.price}.00</span>

          
        </div>
                )
              })
            }
      </div>

      <div id="summary" class="w-1/4 px-8 py-4 bg-slate-100">
        <h1 class="font-semibold text-2xl border-b pb-5 mb-4">Order Summary</h1>
       
        <div>
          <label class="font-medium inline-block mb-3 text-sm uppercase">Payment method</label>
          <select class="block p-2 text-gray-600 w-full text-sm">
            <option>MercadoPago</option>
            <option>PayPal</option>
          </select>
        </div>
        
  
        <div class="border-t mt-8">
          <div class="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>${carrito.totalValue}.00</span>
          </div>
          <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
        </div>
      </div>

    </div>
  </div>
  </div>

            <Footer />
  </div>
  )
}
