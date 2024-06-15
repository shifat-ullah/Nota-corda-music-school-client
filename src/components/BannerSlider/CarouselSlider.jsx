import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import AOS from 'aos';
import 'aos/dist/aos.css';

function CarouselBanner() {
  const slides = [
    {
      image: 'https://melody.ancorathemes.com/wp-content/uploads/2016/05/bg1-Parallax.jpg',
      heading: 'start with a note',
      title: 'awaken possibility',
    },
    {
      image: 'https://melody.ancorathemes.com/wp-content/uploads/2016/05/slider1.jpg',
      heading: 'music for everyone',
      title: 'awaken possibility',
    },
    {
      image: 'https://melody.ancorathemes.com/wp-content/uploads/2016/05/slider2.jpg',
      heading: 'music is your world',
      title: "don't miss a chance",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationIndex, setAnimationIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      const isLastAnimation = animationIndex === 2;
      const newAnimationIndex = isLastAnimation ? 0 : animationIndex + 1;
      setAnimationIndex(newAnimationIndex);
    }, 3000);
    return () => clearInterval(animationInterval);
  }, [animationIndex]);

  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: false,
    });
  }, []);

  return (
    <div
      className="w-full absolute bg-center bg-cover md:h-[32rem] dark:border-b-2 dark:border-white carousel-banner h-[25rem] m-auto py-16 px-4  top-0 group"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${slides[currentIndex].image})`
      }}
    >
      <div className="absolute inset-0 md:bg-transparent bg-black opacity-20"></div>
      <div className="w-full flex lg:px-20 md:py-20 py-10 flex-col relative z-10 items-center mt-16">
        <h3
          className="md:text-7xl text-3xl my-2 font-bold md:w-full text-white text-center font-Pt dark:font-Merienda"
          data-aos={animationIndex === 0 ? 'fade-up' : animationIndex === 1 ? 'fade-down' : 'fade-right'}
          data-aos-delay="500" // Delay before the animation starts (in milliseconds)
        >
          {slides[currentIndex].heading}
        </h3>
        <p
          className="mb-2 md:text-xl text-lg text-info dark:text-warning tracking-wider dark:font-Pt font-bold"
          data-aos={animationIndex === 0 ? 'fade-up' : animationIndex === 1 ? 'fade-down' : 'fade-right'}
          data-aos-delay="1000"
        >
          {slides[currentIndex].title}
        </p>
        <button
          className="awesome-btn w-[180px] rounded-full px-5 p-2"
          data-aos={animationIndex === 0 ? 'fade-up' : animationIndex === 1 ? 'fade-down' : 'fade-right'}
          data-aos-delay="1500"
        >
          Start Learning
        </button>
      </div>
      {/* Left Arrow */}
      <div className="hidden z-10 group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden z-10 group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
    </div>
  );
}

export default CarouselBanner;