import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { PostPhone, getBrands, getFeatures } from "../redux/actions/index.js";
import axios from "axios";
import swal from "sweetalert";

export const CreateProduct = () => {
  const dispatch = useDispatch();

  const brands = useSelector((state) => state.Brands);
  const phones = useSelector((state) => state.Phones);
  const features = useSelector((state) => state.Features);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    year: "",
    brandid:""
  });
  const [image, setImage] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  ////*upload image

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "cloudinary"); //carpeta donde se guardan las imagenes
    await axios
      .post(`https://api.cloudinary.com/v1_1/dl0betelp/image/upload`, data)
      .then((response) => setImage(response.data.secure_url));
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
    if (!form.description.trim()) {
      errors.description = "Description is required";
    }
    if (!form.year.trim()) {
      errors.year = "Description is required";
    }

   /*  if (!image) {
      errors.image = "Image is required";
    } */
    if (!form.price.trim()) {
      errors.price = "Price is required";
    }
    if (!form.stock.trim()) {
      errors.stock = "Stock is required";
    }
    if (!selectedBrand.trim()) {
      errors.brand = "Brand is required";
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
    if (Object.keys(errors).length) {
      swal({
        title: "Error",
        text: "You must complete all fields",
        icon: "warning",
        buttons: "Ok",
      });
    } else {
      const updatedFormData = {
        ...form,
        brandid: selectedBrand,
        /*  platformName: selectedPlatforms, */
        image: image,
      };

      dispatch(PostPhone(updatedFormData));
      console.log(updatedFormData);
      swal({
        title: "Success",
        text: "A new product has been created!",
        icon: "success",
        buttons: "Ok",
      });
      // goBack();
    }
  };

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getFeatures());
  }, [dispatch]);

  return (
    <div className="card rounded-none p-6 w-1/2 mx-auto">
      {console.log(features)}
      <form  className="bg-white p-10 rounded-lg shadow-md bg-blue-200 flex flex-col  h-full "  onSubmit={handleSubmit}>
        <label className="letas" htmlFor="name">
          Name:
        </label>
        <div>
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

        <label className="letas" htmlFor="description">
          Description:
        </label>
        <div>
          <textarea
            id="description"
            name="description"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.description}
          />
          {errors.description && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              {errors.description}
            </p>
          )}
        </div>
        <label className="letas" htmlFor="price">
          Price:
        </label>
        <div>
          <input
            type="number"
            id="price"
            name="price"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.price}
          />
          {errors.price && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errors.price}</p>
          )}
        </div>
        <label className="letas" htmlFor="image">
          Image:
        </label>
        <div>
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
        <label className="letas" htmlFor="stock">
          Stock:
        </label>
        <div>
          <input
            type="number"
            id="stock"
            name="stock"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            value={form.stock}
            onBlur={handleBlur}
            min="1"
            pattern="^[0-9]+"
          />
          {errors.stock && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errors.stock}</p>
          )}
        </div>
        <label className="letas" htmlFor="year">
          Year:
        </label>
        <div>
          <input
            type="number"
            id="year"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="year"
            onChange={handleChange}
            value={form.year}
            onBlur={handleBlur}
            min="1"
            pattern="^[0-9]+"
          />
          {errors.year && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errors.year}</p>
          )}
        </div>

        <label htmlFor="brand" className="letas">
          Brands:{" "}
        </label>

        <div className="selects-check">
        <select className="appearance-none border rounded w-full p-1" onChange={(e) => setSelectedBrand(e.target.value)}>
          {brands?.map((b) => (
          
            <option value={b.id}>{b.name}</option>
            ))}
            </select>
        </div>
        <div>
     
        </div>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-6" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
