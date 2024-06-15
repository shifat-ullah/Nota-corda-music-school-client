
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../../../assets/logo.png'
import profilePic from '../../../assets/logo.png'; // replace with your profile picture path

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <nav className="bg-gray-800 border-b-2 border-b-cyan-50 p-6 flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <div className="font-semibold text-xl tracking-tight">
            <Link to='/'><img className='w-[160px]' src={logo} alt="" /></Link>
          </div>
        </div>
        <div className="block lg:hidden">
          <button onClick={toggleNavbar} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="pr-4 text-xl lg:flex-grow lg:justify-end flex flex-col lg:flex-row">
            <NavLink exact to="/" activeClassName="text-teal-200" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4">
              Home
            </NavLink>
            <NavLink to="/about" activeClassName="text-teal-200" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4">
              About
            </NavLink>
            <NavLink to="/instructors" activeClassName="text-teal-200" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4">
              Instructors
            </NavLink>
            <NavLink to="/classes" activeClassName="text-teal-200" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4">
              Classes
            </NavLink>
            <NavLink to="/dashboard" activeClassName="text-teal-200" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200">
              Dashboard
            </NavLink>
          </div>
          <div className="flex items-center mt-4 lg:mt-0">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-full inline-flex items-center hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600">
              <FaUserCircle className="mr-2" />
              Login
            </button>
            <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full ml-4" />
          </div>
        </div>
      </nav>
    );
  };
export default NavBar;
