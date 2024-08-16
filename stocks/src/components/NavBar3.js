import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../dashboard/context/UserContext';

const Navbar3 = () => {
  const [nav, setNav] = useState(false);
  const { user } = useContext(UserContext);

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: 'Dashboard', link: '/' },
  ];

  return (
    <div className='bg-black flex justify-between items-center border-b-2 border-green-400 h-20 w-full mx-auto px-4 text-white z-50'>
      <Link to='/'>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>
          {user.name === "" ? 'REACT' : user.name}
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-2 pr-4 pl-4 font-bold border-2 rounded-full m-2 cursor-pointer transform transition duration-300 hover:scale-110 hover:bg-green-400 hover:border-white'
            onClick={item.action}
          >
            <Link to={item.link}>{item.text}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <p>&#x2715;</p> : <p>&#9776;</p>}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[40%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-50'
            : 'ease-in-out w-[40%] duration-500 fixed top-0 bottom-0 left-[-100%] z-50'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>
          {'REACT'}
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 transition duration-300 ease-in-out hover:bg-green-400 hover:border-white hover:text-white font-bold cursor-pointer border-gray-600'
            onClick={item.action}
          >
            <Link to={item.link}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar3;
