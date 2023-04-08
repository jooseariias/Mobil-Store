import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom"
import icons from '../../assets/icons-header/icons.js'
import { BsSun, BsMoon, BsFillCartCheckFill, BsFillHeartFill, BsFillPersonFill } from "react-icons/bs"
import { BiLogOutCircle } from "react-icons/bi"
import SearchBar from '../SearchBar/SearchBar.jsx';
import AuthService from '../../helpers/Auth.js'
import Swal from 'sweetalert2'

export default function Header(){
	
	const [theme, setTheme] = useState(window.localStorage.getItem('theme') ? window.localStorage.getItem("theme") : "dark")
	const [user, setUser] = useState({})
	const [Actualizar, setActualizar] = useState(false)
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

	  useEffect(() => {

		if(window.localStorage.getItem('user-log')){
			setUser(JSON.parse(window.localStorage.getItem('user-log')));
		}

		else{
			setUser({});
		}
	  }, [Actualizar])
	  

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

	  const handleFavorites = () => {

		if(!window.localStorage.getItem('user-log')){
			return Swal.fire({
				icon: 'error',
				title: 'Something went wrong',
				text: 'Unvalidated users cannot have a favorites list',
				confirmButtonText: 'Continue'
			  })
		}
	  }

	  const LogOut = () => {
		Swal.fire({
			icon: 'warning',
			title: 'Are you sure you want to sign out?',
			confirmButtonText: 'Yes',
			showDenyButton: true,
		}).then((result) => {
			if (result.isConfirmed){
				Swal.fire({
					icon: 'success',
					title: 'The session has been closed'
				})
				AuthService.LogOut();
				setActualizar(!Actualizar);
			}})
	  }

  	return(
    	<header className="bg-slate-100 dark:bg-gray-900 text-gray-100 flex flex-col duration-300 ">

			<div className=" flex justify-between h-12 mx-auto w-full mb-5 p-2">

				<div className=' flex h-full mt-2 text-xl text-black'>

					
				<img src={icons.logo} className="h-10 w-28" alt="" />

				</div>

				<div>
					<SearchBar />
				</div>

	
				<div className="items-center hidden lg:flex mt-5">

				<div className="duration-300 rounded-full bg-gray-400 dark:bg-gray-400 mr-4">
                {
                  iconComponents?.map((element) => {
                    return (
                    <button onClick={() => setTheme(element.text)} key={element.text} 
                            className={` w-10 h-10 text-xl rounded-full pl-3 hover:transform hover:scale-110 ${theme === element.text && "text-slate-900 "}`}>
                      {element.icon}
                    </button>
                    )
                  })
                }
              	</div> 

				  {/*<img className='h-[30px] w-[30px] cursor-pointer mr-2' src={theme === "light" ? icons['corazon-negro'] : icons['corazon-blanco']} alt="color" />*/}

				  <BsFillHeartFill onClick={() => handleFavorites()} className='w-7 h-7 cursor-pointer text-black dark:text-white mr-4 mt-0.5 hover:transform hover:scale-110' />

				  <Link to='/Cart'>
				  	<BsFillCartCheckFill className='w-7 h-7 cursor-pointer text-black dark:text-white mr-4 hover:transform hover:scale-110' />
				  </Link>

				  {
					Object.keys(user).length === 0 ?
				  		<Link to='/login'>
				  			<BsFillPersonFill className='w-7 h-7 cursor-pointer text-black dark:text-white mr-4 mt-1 hover:transform hover:scale-110' />
				  		</Link>
					:

					<Link to={'/Profile'}>
						<img src={user.dataValues.image} className='w-8 h-8 cursor-pointer rounded-full text-black dark:text-white mr-4 mt-1 hover:transform hover:scale-110' alt="" />
					</Link>
				  }

				  {
					Object.keys(user).length === 0 ?
						<>
						</>
						:
						<BiLogOutCircle onClick={() => LogOut()} className='w-8 h-8 cursor-pointer
							rounded-full text-black dark:text-white mr-4 mt-1 hover:transform hover:scale-110' alt=""	
						/>
				  }
				
				</div>

			</div>

			<div className='flex bg-gray-700 w-full p-2 justify-between px-40 text-md cursor-pointer'>
				<Link to={'/'}><h1 className='font-bold'>Home</h1></Link>
				<Link to={'/Store'}><h1 className='font-bold'>Store</h1></Link>
				<Link to={'/Store'}><h1 className='font-bold'>Support</h1></Link>
				<Link to={'/Store'}><h1 className='font-bold'>About Phonezone</h1></Link>
			</div>
		</header>
  	)
}
