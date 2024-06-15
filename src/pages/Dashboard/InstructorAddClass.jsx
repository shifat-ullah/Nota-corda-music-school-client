import React from 'react'
import UseAuth from '../../Hooks/UseAuth'
import DashboardInfoText from './DashboardInfoText'
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
const InstructorAddClass = () => {

  const { user } = UseAuth()
  const { register, handleSubmit, reset } = useForm()
  const [axiosSecure] = useAxiosSecure()
  const onSubmit = (data) => {
    // console.log(`data`, data);
    const { class_name, image, available_seats, class_level, class_duration, price, description } = data || {}
    const newClass = { class_name, image, available_seats: parseInt(available_seats), class_level, class_duration, price: parseInt(price), description, instructor_name: user.displayName, email: user.email, status: 'pending', students: 0 }
    // console.log(newClass);
    axiosSecure.post('/allClass', newClass)
      .then(result => {
        if (result.data.insertedId) {
          toast('New Class Added Successfully !!!', { autoClose: 2000 })
          reset()
        }
      }).catch(error => {
        console.log(`Error:`, error.message);
      })
  }
  return (
    <>
      <Helmet>
        <title>Music School || Instructor Add New Class Page</title>
      </Helmet>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md bg-slate-100 dark:bg-gradient-to-r dark:from-[#010314] dark:to-[#0f0728] text-info dark:text-warning mx-auto my-20 border-2 p-4 rounded-md shadow-md">
          <DashboardInfoText title={'Add New Class'} />
          <div className='grid md:grid-cols-2 grid-cols-1 w-full gap-4'>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-medium">
                Instructor Name*
              </label>
              <input
                type="text"
                placeholder="Enter name"
                required
                className="form-input dark:text-white"
                disabled
                defaultValue={user.displayName}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-medium">
                Instructor Email*
              </label>
              <input
                type="email"
                placeholder="Enter email"
                required
                className="form-input lowercase dark:text-white"
                disabled
                defaultValue={user.email}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Class Name*
              </label>
              <input
                type="text"
                {...register('class_name', { required: false })}
                placeholder="Enter class Name"
                required
                className="form-input"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Class Photo Url*
              </label>
              <input
                type="text"
                {...register('image', { required: false })}
                placeholder="class Photo Url"
                required
                className="form-input"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Class Price*
              </label>
              <input
                type="number"
                {...register('price', { required: false })}
                placeholder="Class Price"
                required
                className="form-input"

              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-medium">
                Available Seats*
              </label>
              <input
                type="number"
                {...register('available_seats', { required: false })}
                placeholder="Available Seats"
                required
                className="form-input"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-medium">
                Class durations*
              </label>
              <input
                type="text"
                {...register('class_duration', { required: false })}
                placeholder="Class durations"
                required
                className="form-input"
              />
            </div>

            <div className='mb-10'>
              <label htmlFor="category" className="block mb-1 font-medium">
                Select a category:*
              </label>
              <select {...register('class_level', { required: false })} required className="form-input">
                <option value=""> Select a Class Label category:* </option>
                <option value="Begginer">Begginer</option>
                <option value="Intermidiate">Intermidiate</option>
                <option value="Advanced">Advanced</option>
                {/* Add more category options here */}
              </select>
            </div>

          </div>
          <div className='mb-4'>
            <label htmlFor="textarea" className="block fon-medium mb-2">
              Class Details Description*
            </label>
            <textarea required {...register('description', { required: false })}
              className="form-input" placeholder='class description...'
            />
          </div>

          <button
            type="submit"
            className="block w-full px-4 py-2 font-bold awesome-btn rounded-md"
          >
            Add new class
          </button>
        </form>
      </div>
    </>
  )
}

export default InstructorAddClass
