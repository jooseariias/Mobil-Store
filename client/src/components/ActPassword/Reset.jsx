import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Reset() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3001/user/resetPassword', { email, code, password });
        setMessage(response.data.message);
        navigate('/login')
      } catch (error) {
        setMessage(error.response.data.message);
      }
    };
  
    return (
      <div div className="bg-gray-100 dark:bg-slate-800  h-min-screen ">
        
            <Header/>


              <div className="flex flex-col items-center justify-center h-screen m-4 rounded-xl">
            <form onSubmit={handleSubmit} className="bg-white  dark:bg-gray-900  dark:text-white shadow-md rounded p-20 mb-4 m-4 px-20">
              <h2 className=" text-2xl font-bold m-8">reset password</h2>
              {message && <div className="mb-4 text-red-500">{message}</div>}
              <div className=" m-8">
                <label htmlFor="email" className="block  font-bold mb-2">Email:</label>
                <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className=" m-8">
                <label htmlFor="code" className="block font-bold mb-2">Confirmation code:</label>
                <input type="number" id="code" className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setCode(parseInt(e.target.value))} />
              </div>
              <div className=" m-8">
                <label htmlFor="password" className="block  font-bold mb-2">Password:</label>
                <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="bg-gradient-to-r from-red-500 to-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send</button>
            </form>
          </div>


          <Footer/>


      </div>
    );
  }
  export default Reset;