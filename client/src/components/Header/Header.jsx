import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import icons from '../../assets/icons-header/icons.js'
import { BsSun, BsMoon, BsFillCartCheckFill, BsFillHeartFill, BsFillPersonFill } from "react-icons/bs"
import { BiLogOutCircle } from "react-icons/bi"
import SearchBar from '../SearchBar/SearchBar.jsx';
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { LogOut } from '../../redux/actions/index.js'
import { useNavigate } from 'react-router-dom'
import { LoginSuccess } from '../../redux/actions/index.js'

export default function Header(){
	
	const [theme, setTheme] = useState(window.localStorage.getItem('theme') ? window.localStorage.getItem("theme") : "dark")
	const dispatch = useDispatch();
	const [user, setUser] = useState({})
	const [Actualizar, setActualizar] = useState(false)
	const element = document.documentElement;
	const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const navigate = useNavigate();

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

	  const getCookieValue = (cookieName) => {
		const cookieString = document.cookie;
		const cookies = cookieString.split("% ");
		for (let i = 0; i < cookies.length; i++) {
		  const cookie = cookies[i].split("=");
		  if (cookie[0] === cookieName) {
			return cookie[1];
		  }
		}
		return null;
	  };
	  
	  useEffect(() => {

		const userDataCookie = getCookieValue("user_data");
		
		if(userDataCookie){
			const decodedUserDataCookie = decodeURIComponent(userDataCookie);
  			const userData = JSON.parse(decodedUserDataCookie);

			  const data = {
				data_user: userData,
				token: null,
			  }

			dispatch(LoginSuccess(data));
			window.localStorage.setItem('user-log', JSON.stringify(data));
			setUser(JSON.parse(window.localStorage.getItem('user-log')));
		}

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

		if(Object.keys(user).length === 0){
			return Swal.fire({
				icon: 'error',
				title: 'Something went wrong',
				text: 'Unvalidated users cannot have a favorites list',
				confirmButtonText: 'Continue'
			  })
		}

		else{
			navigate('/Wishlist');
		}
	  }

	  const handleLogOut = () => {

		document.cookie = "user_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

		Swal.fire({
			icon: 'warning',
			title: 'Are you sure you want to sign out?',
			confirmButtonText: 'Yes',
			showDenyButton: true,
		}).then((result) => {
			if(result.isConfirmed){

				dispatch(LogOut());
				navigate('/')

				Swal.fire({
					icon: 'success',
					title: 'The session has been closed'
				})

				setActualizar(!Actualizar);
				
			}})
	  }

  return (
    <div className="bg-gray-100-100 dark:bg-gray-800 text-gray-100 flex flex-col justify-center duration-300 ">
      <div className=" flex items-center gap-20 h-[80px] px-4 p-2">
        <div className="w-1/6 pl-8">
          <img src={icons.logo} className="h-10 w-28" alt="" />
        </div>

        <div className="w-full">
          <SearchBar className="w-full" />
        </div>

        <div className="w-1/3 flex items-center justify-around">
          <div className="w-20 h-10 flex justify-around items-center duration-300 rounded-full bg-gray-400 dark:bg-gray-400">
            {iconComponents?.map((element) => {
              return (
                <button
                  onClick={() => setTheme(element.text)}
                  key={element.text}
                  className={`text-xl rounded-full hover:transform hover:scale-110 ${
                    theme === element.text && "text-slate-900 "
                  }`}
                >
                  {element.icon}
                </button>
              );
            })}
          </div>

          {/*<img className='h-[30px] w-[30px] cursor-pointer mr-2' src={theme === "light" ? icons['corazon-negro'] : icons['corazon-blanco']} alt="color" />*/}
          <div className="w-fit text-3xl cursor-pointer text-black dark:text-white flex justify-evenly items-center gap-10">
            <BsFillHeartFill
              onClick={() => handleFavorites()}
              className="text-2xl hover:transform hover:scale-110"
            />

            <Link to="/Cart">
              <BsFillCartCheckFill className="hover:transform hover:scale-110" />
            </Link>

            {Object.keys(user).length === 0 ? (
              <Link to="/login">
                <BsFillPersonFill className="hover:transform hover:scale-110" />
              </Link>
            ) : (
              <Link to={"/Profile"}>
                <img
                  src={user.data_user.image}
                  alt=""
                  className="hover:transform hover:scale-110"
                />
              </Link>
            )}

            {Object.keys(user).length === 0 ? (
              <></>
            ) : (
              <BiLogOutCircle
                onClick={() => handleLogOut()}
                alt=""
                className="hover:transform hover:scale-110"
              />
            )}
          </div>
        </div>
      </div>

      <div className="font-bold flex bg-gray-700 w-full p-2 justify-between px-40 text-md cursor-pointer">
        <Link to={"/"}>
          <h1>Home</h1>
        </Link>
        <Link to={"/Store"}>
          <h1>Store</h1>
        </Link>
        <Link to={"/Store"}>
          <h1>Support</h1>
        </Link>
        <Link to={"/Store"}>
          <h1>About Phonezone</h1>
        </Link>
      </div>
    </div>
  );
}
