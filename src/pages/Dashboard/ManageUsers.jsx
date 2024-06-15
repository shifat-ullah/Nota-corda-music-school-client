import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield } from 'react-icons/fa';
import { RiUserStarFill } from 'react-icons/ri';
import { Helmet } from 'react-helmet-async';

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure()
  const { data: users = [], refetch } = useQuery(['users'], async () => {
    const res = await axiosSecure.get('/users')
    return res.data;
  })
  // console.log('users', users);

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`)
          .then(data => {
            if (data.data.deletedCount > 0)
              // console.log(data)
              Swal.fire(
                'Deleted!',
                '1 User Has Been Deleted.',
                'success'
              )
            refetch()
          }).catch(error => console.log(`404 page not found ${error.message}`))
      }
    })

  }

  const handleUpdateRoleAdmin = (user) => {
    // console.log(`handleUpdateRoleAdmin`, user)
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be change role ${user.name}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, changed it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`)
          .then(data => {
            if (data.data.modifiedCount > 0)
              // console.log(data)
              Swal.fire(
                'Role Updated!',
                `${user.name} now is an admin this site!`,
                'success'
              )
            refetch()
          }).catch(error => console.log(`404 page not found ${error.message}`))
      }
    })

  }


  const handleUpdateRoleInstructor = (user) => {
    // console.log(`handleUpdateRoleAdmin`, user)
    const { name, image, email } = user || {}
    const currentUser = {instructor_name:name, email, image }
    // console.log(currentUser);
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be change role ${user.name}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, changed it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post(`/instructors`, currentUser)
        axiosSecure.patch(`/users/instructor/${user._id}`)
          .then(data => {
            if (data.data.modifiedCount > 0)
              // console.log(data)
              Swal.fire(
                'Role Updated!',
                `${user.name} now is an instructor this site!`,
                'success'
              )
            refetch()
          }).catch(error => console.log(`404 page not found ${error.message}`))
      }
    })

  }




  return (
    <>
      <Helmet>
        <title>Music School || Admin Manage Users Page</title>
      </Helmet>
      <h3 className='text-center my-10 font-bold tracking-wider text-slate-500 dark:text-white underline decoration-double md:text-3xl text-xl font-Pt dark:font-Merienda'>site total users is: <span className='text-info dark:text-warning'></span>{users.length || 0}</h3>
      <div className="flex flex-col justify-center h-full">
        {/* Table */}
        <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 dark:bg-gradient-to-r dark:from-[#010314] dark:to-[#0f0728]">
          <div className="p-3">
            <div className="overflow-x-auto overflow-scrollbar">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">sl</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">user photo</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">email</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">role</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y dark:text-white divide-gray-100 text-slate-500 font-medium">
                  {users?.map((user, i) => {
                    const admin = user.role === 'admin';
                    const instructor = user.role === 'instructor';
                    return (
                      <tr key={user._id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{i + 1}</div>
                        </td>

                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 mr-2 sm:mr-3 my-4">
                              <img
                                className="rounded-md"
                                src={user.image ? user.image : 'https://raw.githubusercontent.com/jakaria455173/aIrcnc-awesome-projects/main/client/src/assets/images/placeholder.jpg'}
                                width="40"
                                height="40"
                                alt="user profile img"
                              />
                            </div>
                          </div>
                        </td>

                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{user.name}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium lowercase">{user.email}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left capitalize font-bold">{user.role}</div>
                        </td>

                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center flex gap-10">
                            <button disabled={admin} onClick={() => handleUpdateRoleAdmin(user)} className={`px-10 py-[5px] border-2 flex items-center gap-2  bg-info text-white hover:bg-warning rounded-md ${admin?'opacity-50 cursor-no-drop' : ''}`}>Make Admin <FaUserShield className='text-xl' /></button>
                            <button disabled={instructor||user.mainAdmin==='admin'} onClick={() => handleUpdateRoleInstructor(user)} className={`px-10 py-[5px] border-2 flex items-center gap-2  bg-info text-white hover:bg-warning rounded-md ${instructor||user.mainAdmin==='admin'?'opacity-50 cursor-no-drop' : ''}`}>Make Instructor <RiUserStarFill className='text-xl' /></button>
                            <button disabled={user.mainAdmin==='admin'} onClick={() => handleDeleteUser(user)} className={`awesome-btn px-10 py-[2px] rounded-full ${user.mainAdmin==='admin'?'opacity-50 cursor-no-drop' : ''}`}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
