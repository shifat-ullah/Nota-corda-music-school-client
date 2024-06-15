import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import UseAllUsers from '../../Hooks/UseAllUsers';
import UseAuth from '../../Hooks/UseAuth';
import UseSelectClass from '../../Hooks/UseSelectClass';

const ClassCard = ({ singleClass }) => {
  const { user } = UseAuth();
  const { _id, class_name, image, class_level, description, price, available_seats, instructor_name, class_duration, email, students } = singleClass || {};
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = UseSelectClass();
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);
  const [allUsers] = UseAllUsers()
  const currentUser = allUsers?.find(users => users?.email === user?.email)

  const handleSelectClass = (id) => {
    const SelectClassInfo = {
      selectClassId: id,  
      class_name,
      image,
      class_level,
      price,
      class_duration,
      instructor_name,
      email: user?.email,
      instructor_email: email,
      payment: false,
      students
    };
    if (user?.email) {
      fetch('https://nota-corda-music-school-server.vercel.app//selectClasses', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(SelectClassInfo)
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            refetch();
            // console.log(data)
            toast('You Are Select The Class !!!', { autoClose: 2000 })
          }
        })
        .catch(error => console.log(`404 page not found ${error.message}`));
    } else {
      Swal.fire({
        title: 'Please login to select the class',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login Now'
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    setIsSelectDisabled(available_seats === 0 || currentUser?.role === 'admin' || currentUser?.role === 'instructor');
  }, [available_seats, user, _id]);

  const cardClassName = `overflow-hidden shadow-md p-2 border-2 rounded-md dark:bg-gradient-to-r dark:from-[#010314] dark:to-[#0f0728]  cursor-pointer group ${available_seats === 0 ? 'bg-red-200' : ''
    }`;

  return (
    <div className={cardClassName} data-aos="fade-up">
      <img
        className="w-full h-[200px] object-fill p-2 rounded-xl overflow-hidden group-hover:scale-110 duration-300 transition"
        src={image}
        alt="music class img"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-2xl font-Pt tracking-wider dark:font-Merienda text-slate-600 dark:text-white mb-2 text-center">
          {class_name}
        </div>
        <p className="text-slate-600 text-base dark:text-[#ddd] pt-2">{description}</p>
      </div>

      <div className="flex pl-6 gap-2 mb-2 flex-col">
        <p className="text-xl font-bold dark:text-white">
          Instructor Name: <span className="dark:text-warning text-info">{instructor_name}</span>
        </p>
        <p className="text-xl font-bold dark:text-white">
          available seats:
          <span className="dark:font-Merienda font-Pt text-warning text-left dark:text-info tracking-wider pl-2">
            {available_seats}
          </span>
        </p>
        <p className="text-xl font-bold dark:text-white">
          enrolled students:
          <span className="dark:font-Merienda font-Pt text-warning text-left dark:text-info tracking-wider pl-2">
            {students}
          </span>
        </p>
        <p className="text-xl font-bold dark:text-white">
          Price: <span className="dark:text-warning text-info">$</span>
          {price}
        </p>
        <p className="text-xl font-bold dark:text-white">
          Class Level:
          <span className="dark:font-Merienda font-Pt text-warning dark:text-info tracking-wider pl-2">{class_level}</span>
        </p>
      </div>

      <button
        onClick={() => handleSelectClass(_id)}
        className={`awesome-btn text-center p-2 flex justify-center items-center rounded-md my-5 cursor-pointer w-3/4 mx-auto text-green-500 font-bold ${isSelectDisabled || currentUser?.role === 'admin' || currentUser?.role === 'instructor' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        disabled={isSelectDisabled || currentUser?.role === 'admin' || currentUser?.role === 'instructor'}
      >
        Select Class
      </button>
    </div>
  );
};
export default ClassCard