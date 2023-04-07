import { useState} from "react";

import { useDispatch, useSelector } from "react-redux";
import { PostUser } from "../../redux/actions/index.js";
import axios from "axios";
import swal from "sweetalert2";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import seePassword from "../../assets/icons-register/seePassword.png"

export const Register = () => {
  const dispatch = useDispatch();

  const AllUsers = useSelector((state) => state.Users);
  const [showPwd, setShowPwd] = useState(false)

  const [form, setForm] = useState({
    name: "",
    surname: "",
    password: "",
    email: "",
  
   // image:""
  });
  const [image, setImage] = useState("");
  ////*upload image

  const handleImage = async (e) => {
    try {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "store_phones"); //carpeta donde se guardan las imagenes
      await axios
        .post(`https://api.cloudinary.com/v1_1/dwfhsitwe/image/upload`, data)
        .then((response) => setImage(response.data.secure_url) );
      
    } catch (error) {
      console.log(error.message)
    }
  };
  /////////
  const [errors, setErrors] = useState({});
  //* validaciones : ///////////////////////////////////////////////

  const validateInput = (form) => {
    let errors = {};

    const expresiones = {
      regPassword : /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{1,150}$/,
      regEmail:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
    } 

    if (form.name.trim().length > 0) {
      let UserExist = AllUsers.filter(
        (e) => e.email.toLowerCase() === form.email.toLowerCase()
      );
      if (UserExist.length > 0) errors.email = "The email already exists";
    }
    //
    if (!form.name.trim()) {
      errors.name = "Name is required";
    }
    if (!form.surname.trim()) {
      errors.surname = "Surname is required";
    }
    
    if (!form.password.trim()) {
      errors.password = "password is required";
    }
    if (form.password.trim().length > 16) {
      errors.password = "must have a maximum of 16 characters";
    }
    if (form.password.trim().length < 8) {
      errors.password = "must contain at least 8 characters";
    }
     if (!image.length) {
      errors.image = "Image is required";
    } 
    if (!form.email.trim()) {
      errors.email = "email is required";
    }
    if (!expresiones.regPassword.test(form.password.trim())) {
      errors.password = "the password at least one digit, at least one lower case and at least one upper case.";
    }
    if (!expresiones.regEmail.test(form.email.trim())) {
      errors.email = "The email format is incorrect";
    }

    return errors;
  };

  const handleBlur = () => {
    setErrors(validateInput(form));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length || !form.name|| !form.surname|| !form.password|| !form.email||!image.length) {
      swal({
        title: "Error",
        text: "You must complete all fields",
        icon: "warning",
        buttons: "Ok",
      });
    } else {
      const updatedFormData = {
        ...form,
        image: image,
      };

      dispatch( PostUser(updatedFormData));
      setForm({
       name:"",
       surname:"",
       password:"",
       email:"",
     
      })

      setImage({image:""})
      console.log(updatedFormData);
      swal({
        title: "Success",
        text: "The user has been registered!",
        icon: "success",
        buttons: "Ok",
      });
      // goBack();
    }
  };


  return (
    <div className="bg-gray-100  h-min-screen ">

          <Header/>


    
      <div className="flex flex-col min-height-full justify-center card rounded-none p-6 w-1/2 mx-auto h-full bg-gray-100 objet-cover bg-white m-20">
        <div className="text-center item-center flex justify-center">
              <h1 className="text-center m-1 text-2xl font-bold">Register</h1>
        </div>

     <form  className="bg-white p-10 rounded-lg shadow-md bg-blue-200 flex flex-col m-1 h-full space-y-1"  onSubmit={handleSubmit}>
        <div class='grid grid-cols-1 lg:grid-cols-2 lg:gap-3'>

        <div>
        <label className="letas font-bold" htmlFor="name">
          Name
        </label>
          <input
            type="text"
            id="name"
            name="name"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.name}
          />
          {errors.name && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errors.name}</p>
          )}
        </div>


        <div>
          <label className="letas font-bold" htmlFor="surname">
            Surname
          </label>
          <input
            id="surname"
            name="surname"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.surname}
          />
          {errors.surname && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              {errors.surname}
            </p>
          )}
        </div>

        <div>
        <label className="letas font-extrabold" htmlFor="password">
          Password
        </label>

         <div className="  flex item-center justify-between flex-wrap bg-white mt-2 shadow appearance-none  p-4 rounded w-full py-2 px-3 text-gray-700 leading-tight ">
         <input 
           type={showPwd ? "text" : "password"}
            id="password"
            name="password"
            className="focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.password}
          />
            <a class="block lg:inline-block lg:mt-0 " onClick={() => setShowPwd(!showPwd)}> <img  class= " z-6 inset-y-0 my-auto h-6 active:bg-gray-600 active:rounded-full"src = {seePassword}/> </a>
         </div>
          {errors.password && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errors.password}</p>
          )}
        </div>

        <div>
        <label className="letas font-bold" htmlFor="image">
          Image
        </label>

          <input
            type="file"
            name="file"
            onBlur={handleBlur}
            onChange={handleImage}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.image && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errors.image}</p>
          )}
        </div>

        <div>
        <label className="letas font-bold" htmlFor="email">
            Email
        </label>

          <input
            type="text"
            id="email"
            name="email"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            value={form.email}
            onBlur={handleBlur}
          />
          {errors.email && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errors.email}</p>
          )}
        </div>


          <button className="bg-gradient-to-r from-red-500 to-blue-900 text-white font-bold py-2 px-4 rounded mt-6" type="submit"  >
          Submit 
        </button>
        </div>
     </form>
   </div>

     <Footer/>
     
      </div>
  );
};
