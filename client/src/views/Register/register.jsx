// import { useState} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { PostUser } from "../../redux/actions/index.js";
// import axios from "axios";
// import swal from "sweetalert2";
// import Header from "../../components/Header/Header.jsx";
// import Footer from "../../components/Footer/Footer.jsx";

// import seePassword from "../../assets/icons-register/seePassword.png"

// export const Register = () => {
//   const dispatch = useDispatch();

//   const AllUsers = useSelector((state) => state.Users);
//   const [showPwd, setShowPwd] = useState(false)

//   const [form, setForm] = useState({
//     name: "",
//     surname: "",
//     password: "",
//     email: "",
  
//    // image:""
//   });
//   const [image, setImage] = useState("");
//   ////*upload image

//   const handleImage = async (e) => {
//     try {
//       const file = e.target.files[0];
//       const data = new FormData();
//       data.append("file", file);
//       data.append("upload_preset", "store_phones"); //carpeta donde se guardan las imagenes
//       await axios
//         .post(`https://api.cloudinary.com/v1_1/dwfhsitwe/image/upload`, data)
//         .then((response) => setImage(response.data.secure_url) );
      
//     } catch (error) {
//       console.log(error.message)
//     }
//   };
//   /////////
//   const [errors, setErrors] = useState({});
//   //* validaciones : ///////////////////////////////////////////////

  // const validateInput = (form) => {
  //   let errors = {};

  //   const expresiones = {
  //     regPassword : /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{1,150}$/,
  //     regEmail:  /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
  //   } 

    // if (form.email.trim().length > 0) {
    //   let UserExist = AllUsers.filter(
    //     (e) => e.email.toLowerCase() === form.email.toLowerCase()
    //   );
    //   if (UserExist.length > 0) errors.email = "The email already exists";
    // }
  //   //
  //   if (!form.name.trim()) {
  //     errors.name = "Name is required";
  //   }
  //   if (!form.surname.trim()) {
  //     errors.surname = "Surname is required";
  //   }
    
  //   if (!form.password.trim()) {
  //     errors.password = "password is required";
  //   }
  //   if (form.password.trim().length > 16) {
  //     errors.password = "must have a maximum of 16 characters";
  //   }
  //   if (form.password.trim().length < 8) {
  //     errors.password = "must contain at least 8 characters";
  //   }
  //    if (!image.length) {
  //     errors.image = "Image is required";
  //   } 
  //   if (!form.email.trim()) {
  //     errors.email = "email is required";
  //   }
  //   if (!expresiones.regPassword.test(form.password.trim())) {
  //     errors.password = "At least one digit, one uppercase character, and one lowercase character is required.";
  //   }
  //   if (!expresiones.regEmail.test(form.email.trim())) {
  //     errors.email = "The email format is incorrect";
  //   }

  //   return errors;
  // };

//   const handleBlur = () => {
//     setErrors(validateInput(form));
//   };

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (Object.keys(errors).length || !form.name|| !form.surname|| !form.password|| !form.email||!image.length) {
  //     swal.fire({
  //       title: "Error",
  //       text: "You must complete all fields",
  //       icon: "warning",
  //       buttons: "Ok",
  //     });
  //   } else {
  //     const updatedFormData = {
  //       ...form,
  //       image: image,
  //     };

  //     dispatch( PostUser(updatedFormData));
  //     setForm({
  //      name:"",
  //      surname:"",
  //      password:"",
  //      email:"",
     
  //     })
  //     swal.fire({
  //       title: "Success",
  //       text: "The user has been registered!",
  //       icon: "success",
  //       buttons: "Ok",
  //     });

  //     setImage({image:""})
  //     navigate('/')
  //     console.log(updatedFormData);

  //     // goBack();
  //   }
  // };


//   return (
//     <div className="bg-gray-100  h-min-screen ">

//           <Header/>

    
//       <div className="flex flex-col h-3/4 justify-center card rounded-none p-6 w-1/2  mx-auto h-full m-20 bg-white objet-cover  m-20 objer-cover">
        // <div className="text-center item-center flex justify-center m-8 ">
        //       <h1 className="text-center m-1 text-2xl font-bold">Register</h1>
        // </div>

//      <form  className="bg-white p-10 rounded-lg   flex flex-col m-1 h-full space-y-1  "  onSubmit={handleSubmit}>
//         <div class='grid grid-cols-1 lg:grid-cols-2 lg:gap-3 m-3'>

//         <div className="">
//         <label className="letas font-bold" htmlFor="name">
//           Name
//         </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={form.name}
//           />
//           {errors.name && (
//             <p style={{ color: "red", fontWeight: "normal" }}>{errors.name}</p>
//           )}
//         </div>


//         <div  className="">
//           <label className="letas font-bold" htmlFor="surname">
//             Surname
//           </label>
//           <input
//             id="surname"
//             name="surname"
//             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={form.surname}
//           />
//           {errors.surname && (
//             <p style={{ color: "red", fontWeight: "normal" }}>
//               {errors.surname}
//             </p>
//           )}
//         </div>

//         <div  className="justify-between">
//         <label className="letas font-bold" htmlFor="password">
//           Password
//         </label>

//          <div className="  flex item-center border justify-between flex-wrap bg-white  appearance-none focus:outline-none focus:shadow-outline  p-4 rounded w-full py-2 px-3 text-gray-700 leading-tight ">
//          <input 
//            type={showPwd ? "text" : "password"}
//             id="password"
//             name="password"
//             className="focus:outline-none focus:shadow-outline "
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={form.password}
//           />
//             <a class="block lg:inline-block lg:mt-0 " onClick={() => setShowPwd(!showPwd)}> <img  class= " z-6 inset-y-0 my-auto h-6 active:bg-gray-600 active:rounded-full"src = {seePassword}/> </a>
//          </div>
//           {errors.password && (
//             <p style={{ color: "red", fontWeight: "light" }}>{errors.password}</p>
//           )}
//         </div>

//         <div  className="">
//         <label className="letas font-bold" htmlFor="image">
//           Image
//         </label>

//           <input
//             type="file"
//             name="file"
//             onBlur={handleBlur}
//             onChange={handleImage}
//             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {errors.image && (
//             <p style={{ color: "red", fontWeight: "normal" }}>{errors.image}</p>
//           )}
//         </div>

//         <div  className="">
//         <label className="letas font-bold" htmlFor="email">
//             Email
//         </label>

//           <input
//             type="text"
//             id="email"
//             name="email"
//             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             onChange={handleChange}
//             value={form.email}
//             onBlur={handleBlur}
//           />
//           {errors.email && (
//             <p style={{ color: "red", fontWeight: "normal" }}>{errors.email}</p>
//           )}
//         </div>


//           <button className="bg-gradient-to-r from-red-500 to-blue-900 text-white font-bold py-2 px-4 rounded mt-3" type="submit"  >
//           Submit 
//         </button>
//         </div>
//      </form>
//    </div>

//      <Footer/>
     
//       </div>
//   );
// };
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
// import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PostUser } from '../../redux/actions';
import validation from './validation';
// import s from './form.module.css'
import swal from 'sweetalert';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import seePassword from "../../assets/icons-register/seePassword.png"
import { useNavigate } from 'react-router-dom';
import { BsEyeSlash } from "react-icons/bs";


export default function Register() {
    const dispatch = useDispatch()
    const [picture, setPicture] = useState('')
    const [seePassword, setSeePassword] = useState(false);
    const navigate = useNavigate()

    // const history = useHistory()

    // const navigateTo = (url) => {
    //     history.push(url)
    // }

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "game_store");
        await axios
            .post(`https://api.cloudinary.com/v1_1/dwfhsitwe/image/upload`, data)
            .then((response) => setPicture(response.data.secure_url))
    };


    const handleRegister = (values) => {
        let formData = {...values, image: picture}
        console.log(formData);
        dispatch(PostUser(formData))
        swal('User succesfully created')
        navigate('/login')
    }


    return (
        <div className="bg-gray-100  dark:bg-gray-900 h-min-screen ">

            <Header/>

            <div className= "flex flex-col h-3/4 justify-center card rounded-none p-6 w-1/2  mx-auto h-full m-20 bg-white dark:bg-gray-400 objet-cover rounded-xl  m-20 objer-cover ">
              <div className="text-center item-center flex justify-center m-8 ">
                <h1 className="text-center m-1 text-2xl font-bold">Phone zone</h1>
              </div>

            <Formik className = "bg-white  rounded-lg  flex flex-col justify-center item-center  text-center m-1 h-full space-y-1 "
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    password: '',
                    image: ''
                }}
                onSubmit={handleRegister}
                validate={validation}
            >
                <Form className='flex flex-col  px-20 '>

                  <div className='m-1'>                      
                    <label className="font-bold px-20">Name</label>
                    <div className='item-center justify-center flex flex-col px-20'>
                    <Field name='name' type='text' placeholder='Firstname' className=" rounded-lg p-1 my-2 focus:outline-none focus:shadow-outline border dark:text-white "/>
                    <ErrorMessage name='name' className='dark:text-white'/>
                    </div> 
                  </div>

                  <div className='m-1'>
                  <label className="font-bold px-20">Surname</label>
                   <div className='item-center justify-center flex flex-col px-20'>
                   <Field name='surname' type='text'  placeholder='Surname' className=" rounded-lg p-1 my-2 focus:outline-none focus:shadow-outline border"/>
                    <ErrorMessage name='surname'/>
                   </div>
                  </div>

                  <div className='m-1'>
                    <label className="font-bold px-20">Email</label>
                    <div className='item-center justify-center flex flex-col px-20'>
                    <Field name='email' type='email' placeholder='Email' className=" rounded-lg p-1 my-2 focus:outline-none focus:shadow-outline border"/>
                      <ErrorMessage name='email'  />
                    </div>
                  </div>

                  <div className='m-1'>
                    <label className="font-bold px-20">Password</label>
                    <div className='item-center relative justify-center flex flex-col px-20'>
                    <Field name='password' type={seePassword ? "text" : "password"}  placeholder='Password' className="justify-center item-center  rounded-lg p-1 my-2 focus:outline-none focus:shadow-outline border"/>
                    <span
                    onClick={() => {
                      setSeePassword(!seePassword);
                    }}
                    className="block lg:inline-block lg:mt-0 absolute right-16 p-7 "
                  >
                    <BsEyeSlash />
                  </span>
      
                    </div>
                    <ErrorMessage name='password'/>
                  </div>
                    
                    <div className='m-1'>
                      <label className="font-bold px-20">Image</label>
                      <div className='item-center justify-center flex flex-col px-20'>
                          <div  style={{ backgroundImage: `url(${picture})` }}></div>                    
                          <Field name='image' type='file' placeholder='image'  className=" rounded-lg p-1 my-2 focus:outline-none focus:shadow-outline border" onChange={handleImage}/>                       
                      </div>
                    </div>

                    <div className='m-1'>                    
                      <div  className='item-center justify-center flex flex-col px-20'>
                      <button type='submit' className=" bg-gradient-to-r from-red-500 to-blue-900 text-white font-bold py-2 px-4 rounded mt-3" >Register</button>
                      </div>
                    </div>
                </Form>

            </Formik>
            </div>

                <Footer/>

        </div>
    )
}
