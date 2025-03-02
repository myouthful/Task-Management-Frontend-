import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      if (response.data.success) {
        setIsSuccess(true);
        setMessage('Login successful!');
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Navigate based on user role
        const { role } = response.data.user;
        switch(role) {
          case 'intern':
            navigate('/intern');
            break;
          case 'staff':
            navigate('/staff');
            break;
          case 'admin':
            navigate('/admin');
            break;
          default:
            setMessage('Invalid user role');
        }
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[315px] mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ...existing input fields... */}

        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-[315px] py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition duration-200
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {message && (
        <div 
          className={`mt-4 w-[315px] p-4 rounded-md ${
            isSuccess 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default Login;