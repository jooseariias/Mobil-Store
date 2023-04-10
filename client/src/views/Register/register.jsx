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

            <div className= "flex flex-col justify-center card p-6 w-1/2  mx-auto h-full m-20 bg-white dark:bg-gray-400 objet-cover rounded-xl objer-cover ">
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
                          <ErrorMessage name='image'/>                     
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