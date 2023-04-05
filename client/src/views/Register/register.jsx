import { useState} from "react";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { PostUser } from "../../redux/actions/index.js";
import axios from "axios";
import swal from "sweetalert2";

import seePassword from "../../assets/icons-register/seePassword.png"

export const Register = () => {
  const dispatch = useDispatch();

  const AllUsers = useSelector((state) => state.Users);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    password: "",
    email: "",
  
   // image:""
  });
  const [image, setImage] = useState("");
  const [showPwd, setShowPwd] = useState(false)

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

  const { register, formState: { errors } , handleSubmit } = useForm({
    defaultValues: {
        is_banned: false,
        description: ""
    }
});

  // const validateInput = (form) => {
  //   let errors = {};
  //   if (form.name.trim().length > 0) {
  //     let productExist = phones.filter(
  //       (e) => e.name.toLowerCase() === form.name.toLowerCase()
  //     );
  //     if (productExist.length > 0) errors.name = "The title already exists";
  //   }
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
  //    if (!image.length) {
  //     errors.image = "Image is required";
  //   } 
  //   if (!form.email.trim()) {
  //     errors.email = "email is required";
  //   }

  //   return errors;
  // };

  const handleBlur = () => {
    setErrors(validateInput(form));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length || !form.name|| !form.surname|| !form.email|| !form.password) {
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
      <div className="bg-gray-100  h-full  item-center">

      <div className="card rounded-none p-6 w-1/2 mx-auto bg-gray-100 objet-cover">
     
     <form  className="bg-white p-10 rounded-lg shadow-md bg-blue-200 flex flex-col  h-full space-y-1"  onSubmit={handleSubmit(onSubmit)}>
        <div class='grid grid-cols-1 lg:grid-cols-2 lg:gap-3'>
   
            <div >
              <label class='text-base font-extrabold'>Name</label>
                <input type="text" class='mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Name' {...register('name', {
                    required: true
                    })} />
                    {errors.name?.type === 'required' && <p class='text-red-500 text-base font-extrabold'> the Name is required</p>}
            </div>


             <div>
                <label class='block text-base font-extrabold mt-2 lg:mt-0 '> Surname: </label>
                   <input  class='mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Last name' 
                   type="text"  {...register('surname', {
                        required: true,
                      })} />
                    {errors.surname?.type === 'required' && <p class='text-red-500 text-base font-extrabold' >the surname is required</p>}
              </div>

              <div >
                 <label class='block text-base font-extrabold mt-2 lg:mt-0 text-white '>Password: </label>

                  <div className="  flex item-center justify-between flex-wrap bg-white mt-2 shadow appearance-none  p-4 rounded w-full py-2 px-3 text-gray-700 leading-tight ">
                  <input  placeholder='Password ' className="  focus:outline-none"  
                  type={showPwd ? "text" : "password"} {...register('password', {
                       pattern: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/ ,
                       required: true,
                       maxLength: 16,
                        minLength: 8
                   })} />
                   <a class="block lg:inline-block lg:mt-0 " onClick={() => setShowPwd(!showPwd)}> <img  class= " z-6 inset-y-0 my-auto h-6 active:bg-gray-600 active:rounded-full"src = {seePassword}/> </a>
                   </div>
                    {errors.password?.type === 'required' && <p class='text-red-500 text-base font-extrabold'>the passaword is required</p>}
                    {errors.password?.type === 'pattern' && <p class='text-red-500 text-base font-extrabold'>the password at least one digit, at least one lower case and at least one upper case.</p>}
                    {errors.password?.type === 'maxLength' && <p class='text-red-500 text-base font-extrabold'>must have a maximum of 16 characters</p>}
                    {errors.password?.type === 'minLength' && <p class='text-red-500 text-base font-extrabold'>must contain at least 8 characters</p>}
              </div>

              <div>
              <label className="letas font-bold" htmlFor="image">
                Image:
              </label>

                <input  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="file"{ ...register('image', {
                  required: true,
                  })}
                  onBlur={handleBlur}
                  onChange={handleImage}
                  />
                   {/* {errors.image?.type === 'required' && <p class='text-red-500 text-base font-extrabold' >the img is required</p>} */}
              </div>

              <div >
                 <label class='block text-base font-extrabold  mt-2 lg:mt-0 text-white'>Email</label>
                  <input type="text" class='mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'  placeholder='Email'  {...register('email', {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    required: true,
                   maxLength: 50,
                    minLength: 3
                    })} />
                    {errors.email?.type === 'pattern' && <p class='text-red-500 text-base font-extrabold'>The email format is incorrect</p>}
                    {errors.email?.type === 'required' && <p class='text-red-500 text-base font-extrabold'> the email is required</p>}
                    {errors.email?.type === 'maxLength' && <p class='text-red-500 text-base font-extrabold'>the maximum capacity of characters allowed is 50</p>}
                    {errors.email?.type === 'minLength' && <p class='text-red-500 text-base font-extrabold' >wrong email</p>}
             </div>


          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-6" type="submit"  >
          Submit 
        </button>
        </div>
     </form>
   </div>
      </div>
  );
};
