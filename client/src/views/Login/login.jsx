import axios from "axios";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import AuthService from "../../helpers/Auth"

function Login() {
  const [googleLogin, setGoogleLogin] = useState();
  const [user, setUser] = useState({ email: "", password: "" });
  const [control, setControl] = useState("");
  const [loginError, setLoginError] = useState("");

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

  console.log(Object.values(user));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!Object.values(user)[0].length) {
      setControl("Please, introduce your login data");
    } else {
      
      AuthService.Login(user).then((data) => {
        alert(data.data.msg)
      }).catch((data) => {
        alert(data.response.data.message)
      })
      
    }
  };
  console.log(user);

  return (
    <div className="flex justify-center pt-20">
      <div className="h-[400px] w-3/5 p-4 flex flex-col justify-around items-center rounded-xl bg-[#17202A] ">
        <h1 className="text-white text-3xl font-medium">
          Login to your account
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-around items-center"
        >
          <input
            onChange={handleUser}
            type="text"
            placeholder="Email"
            name="email"
            value={user.email}
            autoComplete="off"
            className="w-4/5 rounded-lg p-1 my-2"
          />
          <p className="h-8 text-red-400">{loginError}</p>
          <input
            onChange={handleUser}
            type="text"
            placeholder="Password"
            name="password"
            value={user.password}
            autoComplete="off"
            className="w-4/5 rounded-lg p-1 my-2"
          />
          <button
            type="submit"
            className="block rounded-lg p-2 mt-8 mb-2 text-white font-medium w-4/5 bg-gradient-to-r from-red-500 to-blue-900"
          >
            LOGIN
          </button>
          <p className="h-4 text-red-400">{control}</p>
        </form>

        <p className="h-2 w-4/5 flex justify-between items-center">
          <div className="w-full h-px bg-white rounded-full"></div>
          <div className="mx-5 text-white">Or</div>
          <div className="w-full h-px bg-white rounded-full"></div>
        </p>

        <button className="w-fit bg-white rounded-lg flex items-center">
          <FcGoogle className="text-2xl m-1 justify-start" />
          <span
            dangerouslySetInnerHTML={{ __html: googleLogin }}
            className="w-full p-2 text-[#17202A] "
          />
        </button>

      </div>
    </div>
  );
}

export default Login;
