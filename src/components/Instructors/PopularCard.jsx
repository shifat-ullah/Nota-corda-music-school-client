import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PopularCard = ({ singleInstructor }) => {
  const { instructor_name, email, image } = singleInstructor || {};

  React.useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS library
  }, []);

  return (
    <div
      className="dark:bg-gradient-to-r rounded-md dark:from-[#010314] dark:to-[#0f0728]"
      data-aos="zoom"
    >
      <div className="p-2 rounded-md border-2 shadow-md w-full transform transition-transform duration-300 hover:skew-y-2 cursor-pointer">
        <img
          src={image}
          alt="instructor image"
          className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
        />
        <div className="mt-6 mb-2">
          <span className="block md:text-2xl text-xl font-bold pb-3 dark:text-white tracking-widest uppercase text-center font-Pt dark:font-Merienda">
            {instructor_name}
          </span>
          <h2 className="text-xl text-center font-semibold tracking-wide dark:text-white">
            Contact Me: <span className="text-info dark:text-warning lowercase">{email}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PopularCard;




