import React from 'react'
import CarouselSlider from '../../Components/BannerSlider/CarouselSlider'
import PopularClasses from '../../Components/Classes/PopularClasses'
import PopularInstructors from '../../Components/Instructors/PopularInstructors'
import ExtraSection from '../../Components/HomePageExtraSection/ExtraSection'

const HomePage = () => {
  return (
    <>
      <CarouselSlider />
      <div className='md:mt-[500px] mt-[400px]'>
        <PopularClasses />
        <PopularInstructors />
        <ExtraSection/>
      </div>
    </>
  )
}

export default HomePage