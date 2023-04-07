import axios from "axios";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [googleLogin, setGoogleLogin] = useState();
  const [user, setUser] = useState({ email: "", password: "" });
  const [control, setControl] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchAnchor() {
      const { data } = await axios("http://localhost:3001");

      setGoogleLogin(data);
    }
    fetchAnchor();
  }, []);


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
      try {
        const { data } = await axios.post("http://localhost:3001", user);
        const userLoged = data.data.dataValues
        localStorage.setItem('user', JSON.stringify(userLoged))
        navigate('/')
      } catch (error) {
        setLoginError(error.response.data.msg);
      }
    }
  };
  console.log(user);

  return (
    <div className="flex justify-center pt-20">
      <div className="w-1/3 p-4 flex flex-col justify-around items-center rounded-xl bg-white border">
        <h1 className="text-black text-3xl font-medium">
          Login to your account
        </h1>
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

        <button className="w-fit my-4 bg-white rounded-lg flex items-center justify-between border">
          <FcGoogle className="text-2xl ml-2" />
          <span
            dangerouslySetInnerHTML={{ __html: googleLogin }}
            className="w-full p-2 text-[#17202A] "
          />
        </button>
        <p className="text-black py-3">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-300">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
