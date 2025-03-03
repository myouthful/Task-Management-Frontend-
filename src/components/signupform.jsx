import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://tsm-2d9v.onrender.com/signup', formData);
      if (response.data.success) {
        setIsSuccess(true);
        setMessage('Signup successful! Admin will review your application soon.');
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          password: ''
        });
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Signup failed. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-[360px] mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="firstname" className="text-sm font-medium text-gray-700 mb-1">
            First Name:
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastname" className="text-sm font-medium text-gray-700 mb-1">
            Last Name:
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
        type="submit" 
        disabled={isLoading}
        className={`py-2 bg-blue-600
          hover:bg-blue-700 text-white w-[315px]
          font-medium rounded-md 
          transition duration-200
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </button>
      </form>

      {message && (
        <div 
          className={`mt-4 p-4 rounded-md ${
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
};

export default SignUpForm;