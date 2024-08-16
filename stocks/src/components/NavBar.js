// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import UserContext from '../dashboard/context/UserContext';
// import Search from '../dashboard/components/Search'; 
// import logo from './user.png'; 

// const Navbar = () => {
//   const [nav, setNav] = useState(false);
//   const { user, setUser } = useContext(UserContext);
//   const API_URL = 'http://localhost:5000';

//   useEffect(() => {
//     const storedToken = localStorage.getItem('accessToken');
//     if (storedToken) {
//       searchUserData(storedToken);
//     }
//   }, []);

//   const searchUserData = async (token) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await axios.get(`${API_URL}/get-user-data`, config);
//       if (response.data.valid) {
//         setUser({
//           name: response.data.user_name,
//           savedData: response.data.user_data,
//         });
//       } else {
//         handleLogout();
//       }
//     } catch (error) {
//       handleLogout();
//     }
//   };

//   const handleNav = () => {
//     setNav(!nav);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('accessToken');
//     setUser({
//       name: "",
//       savedData: [],
//     });
//   };

//   const navItems = [
//     { id: 1, text: 'Dashboard', link: '/' },
//     { id: 2, text: 'About', link: '/about' },
//     { id: 3, text: 'Login/Register', link: '/login' },
//     { id: 4, text: 'Logout', action: handleLogout },
//   ];

//   return (
//     <div className='bg-black border-b-2 border-green-400 flex justify-between items-center h-15 w-full mx-auto px-4 text-white z-50'>
//       <Link to='/' className='flex items-center'>
//         <img src={logo} alt='Logo' className='h-12 w-12 mr-2' />
//         <h1 className='w-full text-xl font-bold text-green-400'>
//           {(user.name === "") ? 'REACT' : user.name}
//         </h1>
//       </Link>

//       {/* Desktop Navigation */}
//       <ul className='hidden md:flex items-center justify-end space-x-4'>
//         {/* Search */}
//         <div className='flex text-black justify-center flex-1 mr-20'>
//           <Search />
//         </div>

//         {navItems.map(item => (
//           !(((user.name === "") && item.id === 4) || ((user.name !== "") && (item.id === 3))) && (
//             <li
//               key={item.id}
//               className='p-2 pr-4 pl-4 font-bold border-2 rounded-full m-2 cursor-pointer transform transition duration-300 hover:scale-110 hover:bg-green-400 hover:border-white'
//               onClick={item.action}
//             >
//               <Link to={item.link}>{item.text}</Link>
//             </li>
//           )
//         ))}
//       </ul>

//       {/* Mobile Navigation Icon */}
//       <div onClick={handleNav} className='block md:hidden'>
//         {nav ? <p>&#x2715;</p> : <p>&#9776;</p>}
//       </div>

//       {/* Mobile Navigation Menu */}
//       <ul
//         className={
//           nav
//             ? 'fixed md:hidden left-0 top-0 h-full w-[48.5%] border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-50'
//             : 'ease-in-out w-[40%] duration-500 fixed top-0 bottom-0 left-[-100%] z-50'
//         }
//       >
//         {/* Mobile Logo */}
//         <Link to='/' className='flex items-center'>
//           <img src={logo} alt='Logo' className='h-12 w-12 mr-2 ml-3 mt-2' />
//           <h1 className='w-full text-xl font-bold text-green-400 mt-2'>
//             {(user.name === "") ? 'REACT' : user.name}
//           </h1>
//         </Link>

//         <div className='flex text-black justify-center flex-1'>
//           <Search />
//         </div>

//         {/* Mobile Navigation Items */}
//         {navItems.map(item => (
//           !(((user.name === "") && item.id === 4) || ((user.name !== "") && (item.id === 3))) && (
//             <li
//               key={item.id}
//               className='p-4 transition duration-300 ease-in-out hover:bg-green-400 hover:border-white hover:text-white font-bold cursor-pointer border-gray-600'
//               onClick={item.action}
//             >
//               <Link to={item.link}>{item.text}</Link>
//             </li>
//           )
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Navbar;


import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../dashboard/context/UserContext';
import Search from '../dashboard/components/Search';
import logo from './user.png';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const API_URL = 'https://stocks-dashboard-backend.onrender.com';
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      searchUserData(storedToken);
    }
  }, []);

  const searchUserData = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}/get-user-data`, config);
      if (response.data.valid) {
        setUser({
          name: response.data.user_name,
          savedData: response.data.user_data,
        });
      } else {
        handleLogout();
      }
    } catch (error) {
      handleLogout();
    }
  };

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser({
      name: '',
      savedData: [],
    });
  };

  const navItems = [
    { id: 1, text: 'Dashboard', link: '/' },
    { id: 2, text: 'About', link: '/about' },
    { id: 3, text: 'Login/Register', link: '/login' },
    { id: 4, text: 'Logout', action: handleLogout },
  ];

  return (
    <div className="bg-black border-b-2 border-green-400 flex justify-between items-center h-15 w-full mx-auto px-4 text-white z-50">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="h-12 w-12 mr-2" />
        <h1 className="w-full text-xl font-bold text-green-400">
          {user.name === '' ? 'REACT' : user.name}
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center justify-end space-x-4">
        {/* Search */}
        <div className="flex text-black justify-center flex-1 mr-20">
          <Search />
        </div>

        {navItems.map(
          (item) =>
            !(
              ((user.name === '' && item.id === 4) ||
                (user.name !== '' && item.id === 3)) &&
              !(location.pathname === '/about' && item.id === 2)
            ) && (
              <li
                key={item.id}
                className="p-2 pr-4 pl-4 font-bold border-2 rounded-full m-2 cursor-pointer transform transition duration-300 hover:scale-110 hover:bg-green-400 hover:border-white"
                onClick={item.action}
              >
                <Link to={item.link}>{item.text}</Link>
              </li>
            )
        )}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <p>&#x2715;</p> : <p>&#9776;</p>}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 h-full w-[48.5%] border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-50'
            : 'ease-in-out w-[40%] duration-500 fixed top-0 bottom-0 left-[-100%] z-50'
        }
      >
        {/* Mobile Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-12 mr-2 ml-3 mt-2" />
          <h1 className="w-full text-xl font-bold text-green-400 mt-2">
            {user.name === '' ? 'REACT' : user.name}
          </h1>
        </Link>

        <div className="flex text-black justify-center flex-1">
          <Search />
        </div>

        {/* Mobile Navigation Items */}
        {navItems.map(
          (item) =>
            !(
              ((user.name === '' && item.id === 4) ||
                (user.name !== '' && item.id === 3)) &&
              !(location.pathname === '/about' && item.id === 2)
            ) && (
              <li
                key={item.id}
                className="p-4 transition duration-300 ease-in-out hover:bg-green-400 hover:border-white hover:text-white font-bold cursor-pointer border-gray-600"
                onClick={item.action}
              >
                <Link to={item.link}>{item.text}</Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Navbar;
