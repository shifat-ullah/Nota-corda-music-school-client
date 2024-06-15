import React, { useEffect, useState } from 'react';
import InfoText from '../SharedComponents/InfoText';
import CountUp from 'react-countup';
import { Zoom } from 'react-awesome-reveal';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ExtraSection = () => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    AOS.init();

    // Start the interval when the component mounts
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 1);
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  const collageInfo = [
    { num: 231, info: 'students' },
    { num: 14, info: 'teachers' },
    { num: 32, info: 'Programmes' },
    { num: 21, info: 'awards' }
  ];

  return (
    <>
      <InfoText title={'Our School Info'} />
      <div className='w-full lg:h-[550px] md:h-[90%] h-full pb-20 bg-cover object-cover bg-[url("https://melody.ancorathemes.com/wp-content/uploads/2016/05/bg2-Parallax.jpg")] border-2 relative'>
        <Zoom>
          <div className='flex items-center flex-col my-20'>
            <h3 className='text-white font-bold font-Pt lg:text-5xl text-center text-3xl tracking-wider dark:font-Merienda'>
              Nota Corda Music School
            </h3>
            <p className='text-[17px] tracking-wide font-medium md:w-[45%] w-[90%] text-center mt-5 text-white font-Pt dark:font-Merienda'>
              We have talented and very experienced instructors who teach piano, violin, guitar, cello, and other instruments.
            </p>
          </div>
          <div
            className='flex lg:flex-row  flex-wrap justify-center gap-20 w-full relative  items-center'
            data-aos='fade-up' // Add data-aos attribute with animation type
            data-aos-duration='1000' // Specify the animation duration (in milliseconds)
          >
            {collageInfo.map((clg, i) => {
              return (
                <div key={i} className='w-[165.83px] h-[165.83px] border-[1px] bg-transparent rounded-full relative'>
                  <div className='w-[121.01px] h-[121.01px] bg-[#ffffff1a] rounded-full absolute top-[22px] right-[22px]'>
                    <h3 className='text-[50px] text-center my-5 text-white dark:font-pt font-Merienda'>
                      <CountUp start={0} end={clg.num} duration={currentTime*5} />
                    </h3>
                    <p className='text-3xl font-medium dark:font-Merienda font-Pt text-white my-14 tracking-wider'>{clg.info}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Zoom>
      </div>
    </>
  );
};

export default ExtraSection;
