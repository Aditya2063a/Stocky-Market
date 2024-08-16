// // src/Components/Login.js



// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { createBrowserRouter, RouterProvider, Route, Navigate, useNavigate, Link } from "react-router-dom";
// import UserContext from '../dashboard/context/UserContext';

// const API_URL = 'http://localhost:5000';


// const Login = () => {

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [accessToken, setAccessToken] = useState('');
//   const navigate = useNavigate();
//   const { user,setUser } = useContext(UserContext);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('accessToken');
//     if (storedToken) {
//       handleVerifyToken(storedToken);
//     }
//   }, [navigate]);

//   const handleLogin = async () => {
//     try {
//         let email = username;
//       const response = await axios.post(`${API_URL}/login`, {
//         email,
//         password,
//       });
//       setAccessToken(response.data.access_token);
//       setMessage(response.data.message);
//       localStorage.setItem('accessToken', response.data.access_token);
//       handleVerifyToken(response.data.access_token);

//       setUser({
//         name: response.data.user_name,
//         savedData: response.data.user_data,
//       })
//       console.log({
//         name: response.data.user_name,
//         savedData: response.data.user_data,
//       })
//     } catch (error) {
//       setMessage(error.response.data.message);
//     }
//   };

//   const handleVerifyToken = async (token) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await axios.get(`${API_URL}/verify-token`, config);
//       if (response.data.valid) {
//         navigate('/');
//       } else {
//         localStorage.removeItem('accessToken');
//         setAccessToken('');
//         // setUser({
//         //     name: "",
//         //     savedData: [],
//         // })
//         navigate('/login');

//       }
//     } catch (error) {
//       localStorage.removeItem('accessToken');
//       setAccessToken('');
//     //   setUser({
//     //     name: "",
//     //     savedData: [],
//     // })
//       navigate('/login');
//     }
//   };
















//   return (
//     <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
//       <div className="md:w-1/3 max-w-sm">
//         <img
//           src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//           alt="Sample image"
//         />
//       </div>
//       <div className="md:w-1/3 max-w-sm">
        
//         <input
//           className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
//           type="text"
//           placeholder="Email Address"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <p>{message}</p>

//         <div className="text-center md:text-left">
//           <button
//             className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
//             type="submit"
//             onClick={handleLogin}
//           >
//             Login
//           </button>
//         </div>
//         <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
//           Don&apos;t have an account?{" "}
//           <Link
//             className="text-red-600 hover:underline hover:underline-offset-4"
//             to="/signup"
//           >
//             Register
//           </Link>
          
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;









// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from "react-router-dom";
// import UserContext from '../dashboard/context/UserContext';

// const API_URL = 'http://localhost:5000';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [accessToken, setAccessToken] = useState('');
//   const navigate = useNavigate();
//   const { user, setUser } = useContext(UserContext);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('accessToken');
//     if (storedToken) {
//       handleVerifyToken(storedToken);
//     }
//   }, [navigate]);

//   const handleLogin = async () => {
//     try {
//       let email = username;
//       const response = await axios.post(`${API_URL}/login`, {
//         email,
//         password,
//       });
//       setAccessToken(response.data.access_token);
//       setMessage(response.data.message);
//       localStorage.setItem('accessToken', response.data.access_token);
//       handleVerifyToken(response.data.access_token);

//       setUser({
//         name: response.data.user_name,
//         savedData: response.data.user_data,
//       });
//       console.log({
//         name: response.data.user_name,
//         savedData: response.data.user_data,
//       });
//     } catch (error) {
//       setMessage(error.response.data.message);
//     }
//   };

//   const handleVerifyToken = async (token) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await axios.get(`${API_URL}/verify-token`, config);
//       if (response.data.valid) {
//         navigate('/');
//       } else {
//         localStorage.removeItem('accessToken');
//         setAccessToken('');
//         navigate('/login');
//       }
//     } catch (error) {
//       localStorage.removeItem('accessToken');
//       setAccessToken('');
//       navigate('/login');
//     }
//   };

//   return (
//     <section className="h-screen flex flex-col md:flex-row justify-center items-center bg-gray-100">
//       {/* <div className="md:w-1/3 max-w-md flex flex-col items-center">
//         <img
//           src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//           alt="Sample image"
//           className="w-full rounded-md shadow-lg"
//         />
//       </div> */}
//       <div className="md:w-1/3 max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Login to Your Account</h2>
//         <input
//           className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-2"
//           type="text"
//           placeholder="Email Address"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <p className="text-red-500 text-sm mt-2">{message}</p>
//         <div className="text-center md:text-left">
//           <button
//             className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider w-full"
//             type="submit"
//             onClick={handleLogin}
//           >
//             Login
//           </button>
//         </div>
//         <div className="mt-4 font-semibold text-sm text-gray-500 text-center md:text-left">
//           Don&apos;t have an account?{" "}
//           <Link
//             className="text-blue-600 hover:underline"
//             to="/signup"
//           >
//             Register
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import '../styles/transition.css'; 
import '../styles/bg.css';


const API_URL = 'https://stocks-dashboard-backend.onrender.com';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [pageLoaded, setPageLoaded] = useState(false); 
  const [formLoaded, setFormLoaded] = useState(false); 
  const [shiftLeft, setShiftLeft] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
      setTimeout(() => {
        setFormLoaded(true);
        // Activate shiftLeft effect only if not on mobile
        if (!isMobileDevice()) {
          setTimeout(() => {
            setShiftLeft(true);
          }, 1000); // Adjust the delay as needed
        }
      }, 500); // Adjust the delay as needed
    }, 500); // Adjust the delay as needed
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoading(true); 
      let email = username;
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      setMessage(response.data.message);
      localStorage.setItem('accessToken', response.data.access_token);
      handleVerifyToken(response.data.access_token);
    } catch (error) {
      setMessage(error.response.data.message);
    } finally {
      setIsLoading(false); 
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
        navigate('/login');
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  };

  const isMobileDevice = () => {
    return window.innerWidth <= 768; // Adjust the breakpoint as needed
  };

  return (
    <section className="h-screen relative flex items-center justify-center">
      
      <div className="background-image"></div>
      <div className="black-overlay"></div>
      
      {/* Login form */}
      <div className={`relative z-10 bg-gray-800 p-10 rounded-lg shadow-lg max-w-md w-full max-h-[40rem] md:max-h-[50rem] overflow-y-auto transition-popup ${pageLoaded ? 'active' : ''} ${shiftLeft && !isMobileDevice() ? 'transition-shift shift-left' : ''}`}>
        <h2 className={`text-3xl font-semibold text-white text-center mb-6 transition-opacity ${formLoaded ? 'active' : ''}`}>Login to Your Account</h2>
        <div className="flex flex-col gap-6">
          <input
            className={`text-sm w-full px-4 py-3 border border-solid border-gray-300 rounded transition-opacity ${formLoaded ? 'active' : ''} focus:outline-none focus:border-blue-500`}
            type="text"
            placeholder="Email Address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={`text-sm w-full px-4 py-3 border border-solid border-gray-300 rounded transition-opacity ${formLoaded ? 'active' : ''} focus:outline-none focus:border-blue-500`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className={`text-red-500 text-sm mt-3 transition-opacity ${formLoaded ? 'active' : ''}`}>{message}</p>
        <div className={`text-center md:text-left mt-6 transition-opacity ${formLoaded ? 'active' : ''}`}>
          <button
            className={`bg-green-400 transition ease-in-out duration-300 hover:bg-green-500 px-6 py-3 text-white uppercase border-2 rounded text-sm tracking-wider w-full font-bold ${isLoading ? 'opacity-50 pointer-events-none' : ''} ${formLoaded ? 'active' : ''}`}
            type="submit"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </div>
        <div className={`mt-4 font-semibold text-sm text-gray-300 text-center md:text-left transition-opacity ${formLoaded ? 'active' : ''}`}>
          Don&apos;t have an account?{' '}
          <Link
            className="text-red-600 hover:underline"
            to="/signup"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;


















