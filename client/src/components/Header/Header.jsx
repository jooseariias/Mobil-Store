import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import icons from '../../assets/icons-header/icons.js'
import { BsSun, BsMoon, BsFillCartCheckFill, BsFillHeartFill, BsFillPersonFill, BsMoonStarsFill} from "react-icons/bs"
import { RiLogoutCircleRFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa'
import { BiLogOutCircle } from "react-icons/bi"
import SearchBar from '../SearchBar/SearchBar.jsx';
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { LogOut } from '../../redux/actions/index.js'
import { useNavigate } from 'react-router-dom'
import { LoginSuccess } from '../../redux/actions/index.js'
import useThemeSwitcher from '../hooks/useThemeSwitcher.js'

export default function Header(){
	
	const [user, setUser] = useState({})
	const [Actualizar, setActualizar] = useState(false)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [mode, setMode] = useThemeSwitcher();

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
			title: 'Do you want to log out?',
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
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-100 flex flex-col justify-center duration-300 border-b border-gray-400">
      <div className=" flex items-center gap-20 h-[80px] px-4 p-2">
        <div className="w-1/6 pl-8">
          <img src={icons.logo} className="h-10 w-28" alt="" />
        </div>

        <div className="w-full">
          <SearchBar className="w-full" />
        </div>

        <div className="w-1/3 flex items-center justify-around">

          {/*<div className="w-20 h-10 flex justify-around items-center duration-300 rounded-full bg-gray-400 dark:bg-gray-400">
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
		</div>*/}

          {/*<img className='h-[30px] w-[30px] cursor-pointer mr-2' src={theme === "light" ? icons['corazon-negro'] : icons['corazon-blanco']} alt="color" />*/}
          <div className="w-2/3 text-3xl cursor-pointer text-black dark:text-white flex  items-center gap-x-5">

			<button className=' "hover:transform hover:scale-110' onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
				{mode === 'dark' ? <BsSun className='w-6 h-6' /> : <BsMoonStarsFill  className='w-6 h-6'/>}
			</button>

            <BsFillHeartFill
              onClick={() => handleFavorites()}
              className="w-7 h-7 hover:transform hover:scale-110 mt-1"
            />

            <Link to="/Cart">
              <BsFillCartCheckFill className="hover:transform hover:scale-110 w-7 h-7" />
            </Link>

            {Object.keys(user).length === 0 ? (
              <Link to="/login">
                <FaUserCircle  className="hover:transform hover:scale-110 w-7 h-7 mt-1" />
              </Link>
            ) : (
              <Link to={"/Profile"}>
                <img
                  src={user.data_user.image}
                  alt=""
                  className="hover:transform hover:scale-110 w-7 h-7 rounded-full mt-1"
                />
              </Link>
            )}

            {Object.keys(user).length === 0 ? (
              <></>
            ) : (
              < RiLogoutCircleRFill
                onClick={() => handleLogOut()}
                alt=""
                className="hover:transform hover:scale-110 w-7 h-7 rounded-full"
              />
            )}
          </div>
        </div>
      </div>

      	<div class="flex items-center mx-auto mb-4">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-20 lg:w-full lg:mt-0">

                    <li>
						<Link to={'/'}>
							<a className="block py-2 pr-4 pl-3
						   text-gray-500 hover:text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 lg:hover:text-primary-700
						   dark:text-gray-400 lg:dark:hover.text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer
						   ">Home</a>
						</Link>
                    </li>

                    <li>
						<Link to={'/Store'}>
						<a className="block py-2 pr-4 pl-3
						   text-gray-500 hover:text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 lg:hover:text-primary-700
						   dark:text-gray-400 lg:dark:hover.text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer
						   ">Marketplace</a>
						</Link>
                    </li>
                    <li>
						<Link to={'/About'}>
						<a className="block py-2 pr-4 pl-3
						   text-gray-500 hover:text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 lg:hover:text-primary-700
						   dark:text-gray-400 lg:dark:hover.text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer
						   ">Team</a>
						</Link>
                    </li>
                    <li>
						<Link to={'/QA'}>
						<a className="block py-2 pr-4 pl-3
						   text-gray-500 hover:text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 lg:hover:text-primary-700
						   dark:text-gray-400 lg:dark:hover.text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer
						   ">QA</a>
						</Link>
                    </li>
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700
						 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent
						  dark:border-gray-700 cursor-pointer">Contact</a>
                    </li>
                </ul>
    	</div>

    </div>
  );
}