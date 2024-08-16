import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createBrowserRouter, RouterProvider, Route, Navigate, useNavigate, Link } from "react-router-dom";

const API_URL = 'http://localhost:5000';

const Signup = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [message, setMessage] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      const storedToken = localStorage.getItem('accessToken');
      if (storedToken) {
        handleVerifyToken(storedToken);
      }
    }, [navigate]);
  
  
    const handleRegister = async () => {
        if(cPassword !== password){
            setMessage("Passwords don't match")
        }
        else{
            try {
                let email = username;
                const response = await axios.post(`${API_URL}/register`, {
                  name,
                  email,
                  password,
                });
                setMessage(response.data.message);
              } catch (error) {
                setMessage(error.response.data.message);
              }
        }
      
    };
  
    const handleVerifyToken = async (token) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${API_URL}/verify-token`, config);
        if (response.data.valid) {
          navigate('/');
        } else {
          localStorage.removeItem('accessToken');
          setAccessToken('');
          navigate('/login');
        }
      } catch (error) {
        localStorage.removeItem('accessToken');
        setAccessToken('');
        navigate('/login');
      }
    };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded  mt-4"
          type="text"
          placeholder="Email Address"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Confirm Password"
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
        />
        <p>{message}</p> 

        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Have an account?{" "}
          <Link
            className="text-red-600 hover:underline hover:underline-offset-4"
            to="/login"
          >
            Login
          </Link>
          
        </div>
      </div>
    </section>
  );
};

export default Signup;