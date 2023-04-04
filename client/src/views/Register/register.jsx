import { useState} from "react";

import { useDispatch, useSelector } from "react-redux";
import { PostUser } from "../../redux/actions/index.js";
import axios from "axios";
import swal from "sweetalert2";

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
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");
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
    if (form.name.trim().length > 0) {
      let productExist = phones.filter(
        (e) => e.name.toLowerCase() === form.name.toLowerCase()
      );
      if (productExist.length > 0) errors.name = "The title already exists";
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

     if (!image.length) {
      errors.image = "Image is required";
    } 
    if (!form.email.trim()) {
      errors.email = "email is required";
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
    if (Object.keys(errors).length || !form.name|| !form.surname|| !form.email|| !form.password|| !image.length) {
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
     
     <form  className="bg-white p-10 rounded-lg shadow-md bg-blue-200 flex flex-col  h-full space-y-1"  onSubmit={handleSubmit}>
        <div class='grid grid-cols-1 lg:grid-cols-2 lg:gap-3'>
   
        <div>
        <label className="letas font-bold" htmlFor="name">
          Name:
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
            Surname:
          </label>
          <textarea
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
          Password:
        </label>

          <input
            type="text"
            id="password"
            name="price"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.password}
          />
          {errors.password && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errors.password}</p>
          )}
        </div>

        <div>
        <label className="letas font-bold" htmlFor="image">
          Image:
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
            Email:
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


          { Object.values(errors).length ===0  &&  <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-6" type="submit"  >
          Submit 
        </button>}
        </div>
     </form>
   </div>
      </div>
  );
};
