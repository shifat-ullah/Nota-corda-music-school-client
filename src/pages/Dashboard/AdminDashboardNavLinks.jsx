import React from 'react'
import { MdClass } from 'react-icons/md'
import { FaAngleDoubleRight} from 'react-icons/fa'
import Switcher from '../../Components/DarkMode/SwithDarkMode';
import { NavLink } from 'react-router-dom';
const AdminDashboardNavLinks = () => {
  return (
    <>
      <label
        className='inline-flex w-full justify-center items-center px-2  rounded-md cursor-pointer text-gray-800 dark:text-white'
      >
        <span className='px-4 py-1 rounded-md bg-info dark:bg-warning dark:hover:bg-info hover:bg-warning text-white'>
          Admin
        </span>
        <Switcher />
      </label>
      {/* Menu Links */}
      <NavLink
        to='manage-classes'
        className={({ isActive }) =>
          `d-nav-link ${isActive ? 'bg-warning dark:bg-info  text-gray-700 dark:text-white' : 'text-gray-600 dark:text-white'
          }`
        }
      >
        <MdClass className='w-5 h-5' />
        <span className='mx-4 tracking-wider font-Pt dark:font-Merienda font-bold'>manage-classes</span>
      </NavLink>

      <NavLink
        to='manage-users'
        className={({ isActive }) =>
          `d-nav-link ${isActive ? 'bg-warning dark:bg-info  text-gray-700 dark:text-white' : 'text-gray-600 dark:text-white'
          }`
        }
      >
        <FaAngleDoubleRight className='w-5 h-5' />

        <span className='mx-4 tracking-wider font-Pt dark:font-Merienda font-bold'>manage users</span>
      </NavLink>


    </>
  )
}

export default AdminDashboardNavLinks