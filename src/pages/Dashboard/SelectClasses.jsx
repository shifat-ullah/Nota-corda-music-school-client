import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseSelectClass from '../../Hooks/UseSelectClass';

const SelectClasses = () => {
  const [selectClass, refetch] = UseSelectClass()
  const selectClasses = selectClass.filter(singleClass => singleClass.payment === false);
  // console.log(selectClasses, 'selectclass');
  // console.log(`selectClass`, selectClass);
  const total = selectClasses.reduce((sum, item) => item.price + sum, 0)

  const handleDeleteSelectClass = (id) => {
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
        fetch(`http://localhost:5000/selectClasses/${id}`, {
          method: "DELETE",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify()
        })
          .then(response => response.json())
          .then(data => {
            if (data.deletedCount > 0)
              // console.log(data)
              Swal.fire(
                'Deleted!',
                'Your Select Class Has Been Deleted.',
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
        <title>Music School || Student All Class Selected Page</title>
      </Helmet>
      <h3 className='text-center my-10 font-bold tracking-wider text-slate-500 dark:text-white underline decoration-double md:text-3xl text-xl font-Pt dark:font-Merienda'>Total Selected Classes Are: <span className='text-info dark:text-warning'>{selectClasses.length || 0}</span></h3>
      <div className='flex lg:justify-center  lg:flex-row flex-col lg:gap-[400px] gap-2 items-center text-2xl font-medium font-Pt dark:font-Merienda dark:text-white mb-5 text-slate-500'>
        <h3>All Slect Class Total Amount: $<span className='text-info dark:text-warning'>{total || 0}</span></h3>
        {/* <Link  className='awesome-btn px-10 py-2 rounded-md'>Pay</Link> */}
      </div>
      <div className="flex flex-col justify-center h-full">
        {/* Table */}
        <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 dark:bg-gradient-to-r dark:from-[#010314] dark:to-[#0f0728]">
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
                      <div className="font-semibold text-center">class lavel</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">class duration</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y dark:text-white divide-gray-100">
                  {selectClasses?.map((sClass, i) => {
                    return (<tr key={i}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{i + 1}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 mr-2 sm:mr-3">
                            <img
                              className="rounded-md"
                              src={sClass.image}
                              width="40"
                              height="40"
                              alt="class img"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{sClass.class_name}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-info dark:text-warning">${sClass.price}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{sClass.class_level}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{sClass.class_duration}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center flex gap-10">
                          <button onClick={() => handleDeleteSelectClass(sClass._id)} className='awesome-btn px-10 py-[2px] rounded-full'>Delete</button>
                          <Link to="/dashboard/payment" state={{ price: sClass.price, id: sClass._id }} className='awesome-btn px-10 py-[2px] rounded-md'>pay</Link>
                        </div>
                      </td>
                    </tr>)
                  })}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SelectClasses
