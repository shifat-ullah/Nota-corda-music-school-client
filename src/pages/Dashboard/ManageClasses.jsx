import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import UseAllClass from '../../Hooks/UseAllClass';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure()
  const [allClass, refetch] = UseAllClass()
  const handleDeleteInstructorClass = (id) => {
    // console.log(`handleDeleteSelectClass`, id)
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
        axiosSecure.delete(`/allClassAdminDelete/${id}`)
          .then(data => {
            if (data.data.deletedCount > 0)
              // console.log(data)
              Swal.fire(
                'Deleted!',
                'Your Are Deleted Instructor Class.',
                'success'
              )
            refetch()
          }).catch(error => console.log(`404 page not found ${error.message}`))

      }
    })

  }


  // const handleApprovedClass = (id) => {
  //   console.log(`handleApprovedClass`, id)
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to update the class status!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, update it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axiosSecure.patch(`/allClass/admin/${id}`)
  //         .then(data => {
  //           if (data.data.modifiedCount > 0)
  //             // console.log(data)
  //             Swal.fire(
  //               'Updated!',
  //               'Your Are Updated Instructor Class Status.',
  //               'success'
  //             )
  //           refetch()
  //         }).catch(error => console.log(`404 page not found ${error.message}`))

  //     }
  //   })

  // }


  // const handleDeniedClass = (id) => {
  //   console.log(`handleApprovedClass`, id)
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to update the class status!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, update it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axiosSecure.patch(`/allClass/adminDenied/${id}`)
  //         .then(data => {
  //           if (data.data.modifiedCount > 0)
  //             // console.log(data)
  //             Swal.fire(
  //               'Updated!',
  //               'Your Are Updated Instructor Class Status.',
  //               'success'
  //             )
  //           refetch()
  //         }).catch(error => console.log(`404 page not found ${error.message}`))

  //     }
  //   })

  // }


  const handleUpdateClassStatus = (id, status) => {
    let statusText = '';
    if (status === 'approved') {
      statusText = 'Approved';
    } else if (status === 'denied') {
      statusText = 'Denied';
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to update the class status to ${statusText}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, update it to ${statusText}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        const endpoint =
          status === 'approved'
            ? `/allClass/admin/${id}`
            : `/allClass/adminDenied/${id}`;

        axiosSecure
          .patch(endpoint)
          .then((data) => {
            if (data.data.modifiedCount > 0) {
              Swal.fire(
                'Updated!',
                `Your Are Updated Instructor Class Status to ${statusText}.`,
                'success'
              );
              refetch();
            }
          })
          .catch((error) => {
            console.log(`404 page not found ${error.message}`);
          });
      }
    });
  };



  return (
    <>
      <Helmet>
        <title>Music School || Admin Manage Instructor Classes Page</title>
      </Helmet>
      <h3 className='text-center my-10 font-bold tracking-wider text-slate-500 dark:text-white underline decoration-double md:text-3xl text-xl font-Pt dark:font-Merienda'>All instructor total classes add: <span className='text-info dark:text-warning'>{allClass.length || 0}</span></h3>
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
                      <div className="font-semibold text-left">Class Bg</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Class Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Instructor Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Instructor Email</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center"> Available seats</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">price</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">status</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">action</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">feedback</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y dark:text-white divide-gray-100 text-slate-500 font-medium">
                  {allClass?.map((iClass, i) => {
                    const isApproved = iClass.status === 'approved';
                    const isDenied = iClass.status === 'denied';
                    return (
                      <tr key={iClass._id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{i + 1}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 mr-2 sm:mr-3">
                              <img
                                className="rounded-md"
                                src={iClass.image}
                                width="40"
                                height="40"
                                alt="class img"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{iClass.class_name}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium">{iClass.instructor_name}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-sm text-center lowercase">{iClass.email}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center">{iClass.available_seats}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className=" text-center text-lg text-info dark:text-warning">${iClass.price}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className=" text-center text-sm text-warning dark:text-info">{iClass.status}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center flex gap-4 text-sm">
                            <button disabled={isApproved || isDenied} onClick={() => handleUpdateClassStatus(iClass._id, 'approved')}
                              className={`border-2 rounded-md p-2 bg-info text-white ${isApproved || isDenied ? 'opacity-50 cursor-no-drop' : ''}`}
                            >
                              Approved
                            </button>
                            <button disabled={isApproved || isDenied} onClick={() => handleUpdateClassStatus(iClass._id, 'denied')} className={`border-2 rounded-md p-2 bg-info text-white ${isApproved || isDenied ? 'opacity-50 cursor-no-drop' : ''}`} >
                              Denied
                            </button>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center flex gap-10">
                            <Link to={`/dashboard/class-feedback/${iClass._id}`} className='awesome-btn px-10 py-[4px] rounded-md text-sm'>Feedback</Link>
                            <button onClick={() => handleDeleteInstructorClass(iClass._id)} className='awesome-btn rounded-md px-10 py-[4px] text-sm'>Delete</button>
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

export default ManageClasses;
