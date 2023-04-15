import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {

  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
     axios
      .post('http://localhost:3001/user/passwordCode', { email })
      .then((res) => {
         setMessage(res.data.message); 
         setTimeout(() => {
          navigate("/reset")
        }, 5000);
        
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
      
  };

  return (
    <div className="password-reset">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email address:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
          className="border border-gray-400 px-2 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          style={{ maxWidth: '300px' }}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          style={{ marginTop: '0.5rem', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
        >
          Send confirmation code
        </button>
      </form>
      {message && <p className="text-green-600 mt-2" style={{ maxWidth: '300px' }}>{message}</p>}
      {error && <p className="text-red-600 mt-2" style={{ maxWidth: '300px' }}>{error}</p>}
    </div>
  );
};

export default PasswordReset;