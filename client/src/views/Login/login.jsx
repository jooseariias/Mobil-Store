import { useState } from "react";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import AuthService from '../../helpers/Auth'
import Swal from "sweetalert2"
import { LoginSuccess } from "../../redux/actions";

import Header from "../../components/Header/Header"
import Footer from '../../components/Footer/Footer'
import GoogleAuth from '../../components/GoogleAuth/GoogleAuth'

export default function Login(){

  const dispatch = useDispatch();
  const [googleLogin, setGoogleLogin] = useState();
  const [user, setUser] = useState({ email: "", password: "" });
  const [control, setControl] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate()

  const handleUser = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
    setLoginError("");
    setControl("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!Object.values(user)[0].length) {
      setControl("Please, introduce your login data");
    } else {
      AuthService.Login(user).then((response) => {

         // GUARDAMOS SOLO LA DATA QUE NECESITAMOS, LO DEMÁS LO DESCARTAMOS
        
        const data = {
          data_user: response.data.data.dataValues,
          token: response.data.data.token,
        }

        dispatch(LoginSuccess(data));
        
         Swal.fire({
          icon: 'success',
          title: 'Congratulations!',
          text: response.data.message,
          confirmButtonText: 'Continue'
        }).then((result) => {
          if(result.isConfirmed) {
            navigate("/");
          }
          navigate('/')
        })
      }).catch((response => {

        return Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: response.response.data.message
        })}))
    }
  };

  return (
    <div className="">

      <Header />


      <div className="h-[calc(100vh-6.7rem)] bg-gray-200 dark:bg-gray-900 flex justify-center p-10">
        <div className="w-1/3 h-4/5 flex flex-col justify-center my-auto items-center rounded-xl bg-white dark:bg-gray-400 border">
          <h1 className="text-black text-3xl font-medium mb-8 mt-4">Login to your account</h1>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-around items-center"
          >

          <div className="w-4/5"><label className="font-bold">Email</label></div>
            <input
              onChange={handleUser}
              type="text"
              placeholder="Email"
              name="email"
              value={user.email}
              autoComplete="off"
              className="w-4/5 rounded-lg p-1 my-2 focus:outline-none focus:shadow-outline border"
            />
          <p className="h-8 text-red-400">{loginError}</p>

          <div className="w-4/5"><label className="font-bold">Password</label></div>
          <div className="w-4/5 my-2 flex items-center relative ">
            <input
              onChange={handleUser}
              type={seePassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={user.password}
              autoComplete="off"
              className="w-full rounded-lg p-1 focus:outline-none focus:shadow-outline border"
            />
            <span
              onClick={() => {
                setSeePassword(!seePassword);
              }}
              className="absolute right-2"
            >
              <BsEyeSlash />
            </span>
          </div>

          <button
            type="submit"
            className="block rounded-lg p-2 mt-8 mb-2 text-white font-medium w-4/5 bg-gradient-to-r from-red-500 to-blue-900"
          >
            LOGIN
          </button>
          <p className="text-red-400">{control}</p>
        </form>

        <div className="w-4/5 flex justify-between items-center">
          <div className="w-full h-px bg-black rounded-full"></div>
          <div className="mx-5 text-black">Or</div>
          <div className="w-full h-px bg-black rounded-full"></div>
        </div>


        <p className="text-black py-3">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-300">
            Sign up here
          </Link>
        </p>

        <button className="mt-3 w-full text-center">
          <GoogleAuth />
        </button>

      </div>
      </div>

      <Footer />
    </div>
  );
}
