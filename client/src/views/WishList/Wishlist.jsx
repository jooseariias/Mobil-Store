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
    
  return (
    <div>

        <Header />


        <div class="min-h-screen flex flex-col justify-center items-center mt-4">
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
        <Footer />
    </div>
  )
}
 