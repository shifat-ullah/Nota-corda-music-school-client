import React from 'react'
import { keyframes } from "@emotion/react";
import { Fade } from "react-awesome-reveal";
const InfoText = ({ title }) => {
  const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-200px, -100px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
  return (
    <>
      <Fade cascade keyframes={customAnimation}>
        <h3 className='md:text-5xl sm:text-3xl dark:font-Merienda py-10 font-Pt text-3xl font-bold text-slate-700 dark:text-white text-center mb-10 underline decoration-double'>{title}</h3>
      </Fade>
    </>
  )
}

export default InfoText

