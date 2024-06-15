import React from 'react'
import { MdClass } from 'react-icons/md'
import { FaAngleDoubleRight,FaHistory} from 'react-icons/fa'
import Switcher from '../../Components/DarkMode/SwithDarkMode';
import { NavLink } from 'react-router-dom';
const StudentDashboardNabLinks = () => {
  return (
    <>
        <label
          className='inline-flex w-full justify-center items-center px-2  rounded-md cursor-pointer text-gray-800 dark:text-white'
        >
          <span className='px-4 py-1 rounded-md bg-info dark:bg-warning dark:hover:bg-info hover:bg-warning text-white'>
            Student
          </span>
          <Switcher />
        </label>
        {/* Menu Links */}
        <NavLink
          to='select-classes'
          className={({ isActive }) =>
            `d-nav-link ${isActive ? 'bg-warning dark:bg-info  text-gray-700 dark:text-white' : 'text-gray-600 dark:text-white'
            }`
          }
        >
          <MdClass className='w-5 h-5' />

          <span className='mx-4 tracking-wider font-Pt dark:font-Merienda font-bold'>select classes</span>
      </NavLink>

        <NavLink
          to='enrolled-classes'
          className={({ isActive }) =>
            `d-nav-link ${isActive ? 'bg-warning dark:bg-info  text-gray-700 dark:text-white' : 'text-gray-600 dark:text-white'
            }`
          }
        >
          <FaAngleDoubleRight className='w-5 h-5' />

          <span className='mx-4 tracking-wider font-Pt dark:font-Merienda font-bold'>enrolled classes</span>
      </NavLink>

        <NavLink
          to='payment-history'
          className={({ isActive }) =>
            `d-nav-link ${isActive ? 'bg-warning dark:bg-info  text-gray-700 dark:text-white' : 'text-gray-600 dark:text-white'
            }`
          }
        >
          <FaHistory className='w-5 h-5' />
          <span className='mx-4 tracking-wider font-Pt dark:font-Merienda font-bold'>payment history</span>
      </NavLink>



    </>
  )
}

export default StudentDashboardNabLinks