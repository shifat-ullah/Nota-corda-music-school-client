import { useEffect, useState } from 'react';
import Container from '../SharedComponents/Container';
import InfoText from '../SharedComponents/InfoText';
import ClassCard from './ClassCard';

const PopularClasses = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('https://nota-corda-music-school-server.vercel.app//PopularClasses')
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        setData(data)
      }).catch(error=>console.log(`404 page not found ${error}`))
    },[])
  return (
    <div>
      <Container>
        <InfoText title={'our popular classes'} />
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {data.map((singleClass) => (
            <ClassCard key={singleClass._id} singleClass={singleClass} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PopularClasses;
