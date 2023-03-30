import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; //maneja todas las rutas de la aplicacion
import icons from '../../assets/icons-header/icons.js'
import { BsFillDisplayFill, BsSun, BsMoon } from "react-icons/bs";
import { RiComputerLine } from "react-icons/ri";

export default function Header(){
	
	const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem("theme") : "system");
	const element = document.documentElement;
	const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  
	const iconComponents = [
	  {
		text: 'light',
		icon: <BsSun />
		},
		{
		  text: 'dark',
		  icon:  <BsMoon />
		},
		{

		text: 'system',
		icon: <RiComputerLine />},
	]

	  useEffect(() => {

		switch(theme){
	
		  case 'dark':
			element.classList.add('dark');
			window.localStorage.setItem('theme', 'dark')
			break;
		  
		  case 'light':
			element.classList.remove('dark');
			window.localStorage.setItem('theme', 'light');
			break;
		  
		  default:
			window.localStorage.removeItem('theme');
			onWindowMatch();
			break;    
		}
	  }, [theme])

	  darkQuery.addEventListener("change", (e) => {
		if(!("theme") in localStorage){
		  if(e.matches){
			element.classList.add("dark");
		  }else{
			element.classList.remove("dark");
		  }
		}
	  })

	  function onWindowMatch(){
		if(localStorage.theme === "dark"  || (!("theme" in localStorage) && darkQuery.matches)){
		  element.classList.add("dark");
		}else{
		  element.classList.remove("dark");
		}
	  }
	  onWindowMatch();

  	return(
    	<header className="bg-slate-300 dark:bg-slate-800 text-gray-100 flex flex-col duration-300 ">

			<div className=" flex justify-between h-12 mx-auto w-full mb-5 p-2">

				<div className=' flex h-full mt-2 text-xl text-black'>
					<img src={icons.logo} className="h-10 w-28" alt="" />
				</div>

	
				<div className="items-center flex-shrink-0 hidden lg:flex mt-5">

				<div className="duration-300 rounded-full bg-gray-400 dark:bg-gray-400 mr-2">
                {
                  iconComponents?.map((element) => {
                    return (
                    <button onClick={() => setTheme(element.text)} key={element.text} 
                            className={` w-10 h-10 text-xl rounded-full pl-3 ${theme === element.text && "text-slate-900"}`}>
                      {element.icon}
                    </button>
                    )
                  })
                }
              	</div> 


					<img src={icons.favoritos} className="h-8 w-8 mr-4 cursor-pointer" alt="" />
					<img src={icons.carrito} className="h-8 w-8 mr-5 cursor-pointer" alt="" />
					<img src={icons.usuario} className="h-8 w-8 mr-2 cursor-pointer" alt="" />
				</div>
			</div>

			<div className='flex bg-slate-900 w-full p-2 justify-between px-14 text-md cursor-pointer'>
				<h1>HOME</h1>
				<h1>STORE</h1>
				<h1>SOPORTE</h1>
				<h1>SOBRE PHONEZONE</h1>
			</div>
		</header>
  	)
}
