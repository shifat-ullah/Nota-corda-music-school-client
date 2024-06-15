import moment from 'moment';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import UsePaymentHistory from '../../Hooks/UsePaymentHistory';

const PaymentHistoryPage = () => {
  const [payHistory, refetch] = UsePaymentHistory();
  const total = payHistory.reduce((sum, item) => item.price + sum, 0)

  // console.log(payHistory);

  const handleDeletePaymentHistory = (id) => {
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
        fetch(`http://localhost:5000/payHistory/${id}`, {
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
                'Your 1 payment history Has Been Deleted.',
                'success'
              )
            refetch()
          }).catch(error => console.log(`404 page not found ${error.message}`))

      }
    })

  }
  return (
    <div>
      <Helmet>
        <title>Music School || PaymentHistory Page</title>
      </Helmet>
      <h3 className='text-center my-10 font-bold tracking-wider text-slate-500 dark:text-white underline decoration-double md:text-3xl text-xl font-Pt dark:font-Merienda'>you are total payments: <span className='text-info dark:text-warning'>$</span>{total || 0}</h3>
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
                      <div className="font-semibold text-center">student name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">transaction id</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">pay date</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y dark:text-white divide-gray-100 text-slate-500 font-medium">
                  {payHistory?.map((pay, i) => {
                    const formattedDate = moment(pay.date).format('MMMM DD, YYYY, h:mm a');
                    return (
                      <tr key={pay._id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{i + 1}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 mr-2 sm:mr-3">
                              <img
                                className="rounded-md"
                                src={pay.image}
                                width="40"
                                height="40"
                                alt="class img"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{pay.class_name}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-info dark:text-warning">${pay.price}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center">{pay.name}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center">{pay.transectionId}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center">{formattedDate}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-lg text-center flex gap-10">
                            <button onClick={() => handleDeletePaymentHistory(pay._id)} className='awesome-btn px-10 py-[2px] rounded-full'>Delete</button>
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
    </div>
  );
};

export default PaymentHistoryPage;
