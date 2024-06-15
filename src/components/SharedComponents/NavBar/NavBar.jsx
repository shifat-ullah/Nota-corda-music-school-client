import React, { useState,useEffect } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import ImgLogo from '../../../assets/logo.png'
import NavLinks from './NavLinks';
import { Link } from 'react-router-dom';
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleScroll = () => {
      setOpen(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className='shadow-md dark:border-b-[1px] dark:rounded-md w-full fixed z-20 top-0 left-0'>
      <div className='md:flex items-center justify-between bg-white dark:bg-gradient-to-r dark:from-[#010314] dark:to-[#0f0728]  py-4 md:px-10 px-7'>
        {/* logo section */}
        <Link to='/'>
          <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
            <img className='w-[10rem]' src={ImgLogo} alt="site logo" />
          </div>
        </Link>
        {/* Menu icon */}
        <div onClick={handleToggle} className='absolute right-8 top-6 active:text-error dark:text-white font-semibold cursor-pointer md:hidden w-7 h-7'>
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        {/* link items */}
        <NavLinks open={open} />
      </div>
    </div>
  );
};

export default NavBar;