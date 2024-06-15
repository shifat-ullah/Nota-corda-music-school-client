import React from 'react';
import Swal from 'sweetalert2';
import UseMyClass from '../../Hooks/UseMyClasses';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const InstructorMyClasses = () => {
  const [myClass, refetch] = UseMyClass();
  const [axiosSecure] = useAxiosSecure()
  const handleDeleteMyClass = (id) => {
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
        axiosSecure.delete(`/allClass/${id}`)
          .then(data => {
            if (data.data.deletedCount > 0)
              // console.log(data)
              Swal.fire(
                'Deleted!',
                'Your Own Class Has Been Deleted.',
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
        <title>Music School || Instructor My Classes Page</title>
      </Helmet>
      <h3 className='text-center my-10 font-bold tracking-wider text-slate-500 dark:text-white underline decoration-double md:text-3xl text-xl font-Pt dark:font-Merienda'>you are total classes add: <span className='text-info dark:text-warning'>{myClass.length || 0}</span></h3>
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
                      <div className="font-semibold text-left">price</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">students</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">status</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">feedback admin</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">update class</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">delete class</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y dark:text-white divide-gray-100 text-slate-500 font-medium">
                  {myClass?.map((iClass, i) => {
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
                          <div className="text-left font-medium text-info dark:text-warning">${iClass.price}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center">{iClass.students}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center text-warning dark:text-info font-Pt dark:font-Merienda">{iClass.status}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className=" text-center text-sm font-normal border-2 p-2 rounded-md shadow-md cursor-pointer w-[200px] overflow-auto overflow-scrollbar">{iClass.feedback ? iClass.feedback : 'No Feedbacks add Admin...'}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center">
                            <Link to={`/dashboard/instructorClassUpdate/${iClass._id}`} className='awesome-btn px-10 py-[2px] rounded-full'>Update </Link>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center flex gap-10">
                            <button onClick={() => handleDeleteMyClass(iClass._id)} className='awesome-btn px-10 py-[2px] rounded-full'>Delete</button>
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

export default InstructorMyClasses;