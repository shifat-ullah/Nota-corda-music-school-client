import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import DashboardInfoText from './DashboardInfoText';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const InstructorClassUpdate = () => {
  const [axiosSecure] = useAxiosSecure()
  const data = useLoaderData()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  // console.log('data', data);
  const { class_name, image, available_seats, class_duration, class_level, price, status, students, email, instructor_name, description, _id } = data || {}
  const onSubmit = (data) => {
    // console.log(`data`, data);
    const { class_name, image, available_seats, class_level, class_duration, price, description } = data || {}
    const updateClass = { class_name, image, available_seats: parseInt(available_seats), class_level, class_duration, price: parseInt(price), description, instructor_name, email, status, students }
    // console.log(updateClass);
    axiosSecure.put(`/allClass/${_id}`, updateClass)
      .then(result => {
        if (result.data.modifiedCount > 0) {
          toast('Update Classes Data Successfully !!!', { autoClose: 2000 })
          setTimeout(() => {
            navigate('/dashboard/my-class')
          }, 3000);
        }
      }).catch(error => {
        console.log(`Error:`, error.message);
      })
  }
  return (
    <>
      <div>
        <Helmet>
          <title>Music School || Instructor Class Update Page</title>
        </Helmet>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md bg-slate-100 dark:bg-gradient-to-r dark:from-[#010314] dark:to-[#0f0728] text-info dark:text-warning mx-auto my-20 border-2 p-4 rounded-md shadow-md">
          <DashboardInfoText title={'Update Class'} />
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
                defaultValue={instructor_name}
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
                defaultValue={email}
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
                defaultValue={class_name}
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
                defaultValue={image}
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
                defaultValue={price}
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
                defaultValue={available_seats}
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
                defaultValue={class_duration}
              />
            </div>

            <div className='mb-10'>
              <label htmlFor="category" className="block mb-1 font-medium">
                Select a category:*
              </label>
              <select {...register('class_level', { required: false })} required className="form-input" defaultValue={class_level}>
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
              className="form-input" placeholder='class description...' defaultValue={description}
            />
          </div>

          <button
            type="submit"
            className="block w-full px-4 py-2 font-bold awesome-btn rounded-md"
          >
            update class
          </button>
        </form>
      </div>
    </>
  )
}

export default InstructorClassUpdate
