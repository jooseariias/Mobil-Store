import { useEffect } from "react"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer";
import { useSelector } from "react-redux"
import { GetWishList } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function Wishlist(){

    const user = useSelector((state) => state.User);
    const [Wishlist, setWishList] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetWishList(user.data_user.id)).then((response) => {
            setWishList(response.data);
        })
    }, [])

    const RenderEmptyWishlist = () => {
        return (
          <section className="flex items-center h-[calc(100vh-6.5rem)] p-16 dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
                <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                    <span className="sr-only">Error</span>😥
                </h2>
                <p className="text-2xl font-semibold md:text-3xl">Sorry, but your wish list is empty</p>
                <p className="mt-4 mb-8 dark:text-gray-400">But don't worry, you can add to favorites from the store</p>
            </div>
        </div>
    </section>
        )
    }
    
  return (
    <div>

        <Header />

            {
                Wishlist.length == 0 ? <RenderEmptyWishlist /> :
                
        <div class="flex flex-col justify-center items-center mt-4 mb-5">
                <h1 class="text-3xl font-bold mb-8">Wishlist</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-screen-xl">
                {

                    Wishlist?.map((element) => {
                        return(
                            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={element.image} alt="Artículo 1" className="w-full h-[300px] object-cover" />
                            <div class="p-4">
                                <h2 class="text-lg font-bold mb-2">{element.name}</h2>
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Remove</button>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
            }

        <Footer />
    </div>
  )
}
 