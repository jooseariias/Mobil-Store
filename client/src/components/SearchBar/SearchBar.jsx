import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPhone } from "../../redux/actions";

export default function SearchBar(){

    const dispatch = useDispatch();
    const [ name, setName ] = useState("");

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getPhone(name));
        setName('')
    };

    return(
        <div class="relative mt-2">

            <form onSubmit={(e) => handleClick(e)}>
              
        <input 
          class="appearance-none border-2 pl-10 border-gray-900 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Search..."
          onChange={(e) => handleInputChange(e)}
          />
          
        <div class="absolute right-0 inset-y-0 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
              />
          </svg>
        </div>
      
        <div class="absolute left-0 inset-y-0 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
          </svg>
        </div>
              </form>
      </div>
    )

}