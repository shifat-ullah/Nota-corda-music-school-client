import React from 'react'
import PageBanner from '../SharedComponents/PageBanner'
import Container from '../SharedComponents/Container'
import PopularCard from './PopularCard'
import InfoText from '../SharedComponents/InfoText'
import UseallInstructor from '../../Hooks/UseAllInstructors'
import { Helmet } from 'react-helmet-async'

const AllInstructors = () => {
  const [allInstructor] = UseallInstructor()
  return (
    <>
      <Helmet>
        <title>Music School || All Instructors Page</title>
      </Helmet>
      <PageBanner heading={'All Instructors Pages'} bgImg={'https://solfeggio.cmsmasters.net/wp-content/uploads/2017/12/h4.jpg'} />
      <div className='md:my-10 my-0'>
        <InfoText title={'Our All Instructors'} />
        <Container>
          <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6'>
            {allInstructor?.map((singleInstructor) => <PopularCard key={singleInstructor._id} singleInstructor={singleInstructor} />)}
          </div>
        </Container>
      </div>
    </>
  )
}

export default AllInstructors
