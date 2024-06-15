import InfoText from '../SharedComponents/InfoText'
import PopularCard from './PopularCard'
import Container from '../SharedComponents/Container'
import UseallInstructor from '../../Hooks/UseAllInstructors'

const PopularInstructors = () => {
  const [allInstructor] = UseallInstructor()
  // console.log(`allInsturctor`,allInstructor);

  return (
    <div className='my-20'>
      <Container>
        <InfoText title={'Our Popular Instructors'} />
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6'>
          {allInstructor.slice(0,6).map((singleInstructor) => <PopularCard key={singleInstructor._id} singleInstructor={singleInstructor} />)}
        </div>
      </Container>
    </div>
  )
}

export default PopularInstructors