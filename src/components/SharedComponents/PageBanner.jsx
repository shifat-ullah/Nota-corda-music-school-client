// import React from 'react'

// const PageBanner = ({ heading, bgImg }) => {
//   return (
//     <>
//       <img className='md:w-full md:h-[250px] relative shadow-md md:block hidden' src={bgImg} alt="banner img" />
//       <div className='flex flex-col justify-center items-center'>
//         <h2 className='text-center awesome-btn mt-10 px-20 py-2 cursor-pointer rounded-full md:text-[24px] sm:text-[20px] text-[18px] tracking-wider font-bold text-slate-600 absolute top-[80px] md:top-[150px]'>{heading}</h2>
//       </div>
//     </>
//   )
// }

// export default PageBanner

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PageBanner = ({ heading, bgImg }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <img className='md:w-full md:h-[250px] relative shadow-md md:block hidden' src={bgImg} alt="banner img" />
      <div className='flex flex-col justify-center items-center'>
        <h2
          className='text-center awesome-btn mt-10 px-20 py-2 cursor-pointer rounded-full md:text-[24px] sm:text-[20px] text-[18px] tracking-wider font-bold text-slate-600 absolute top-[80px] md:top-[150px] md:block hidden'
          data-aos='zoom-in'
          data-aos-duration='1500'
        >
          {heading}
        </h2>
      </div>
    </>
  );
};

export default PageBanner;

