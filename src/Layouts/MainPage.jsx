// import { Outlet } from "react-router-dom"

// import { Helmet } from "react-helmet-async"
// import NavBar from "../Components/SharedComponents/NavBar/NavBar"
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Footer from "../Components/SharedComponents/Footer";
// import ScrollToTopButton from "../Components/SharedComponents/ScrollToTopButton";
// const MainPage = () => {

//   return (
//     <div className="bg-white text-slate-600 dark:bg-gradient-to-r dark:from-[#010314] dark:to-[#0f0728]">
//         <Helmet>
//         <title>Music School || Home Page</title>
//       </Helmet>
//       <NavBar />
//       <div className='min-h-[calc(100vh-68px)] pt-24 pb-10 '>
//         <ScrollToTopButton/>
//       <Outlet></Outlet>
//       </div>
//       <Footer/>
//       <ToastContainer />
//     </div>
//   )
// }

// export default MainPage







import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import NavBar from "../Components/SharedComponents/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Components/SharedComponents/Footer";
import ScrollToTopButton from "../Components/SharedComponents/ScrollToTopButton";
import LoadingSpinner from "../Components/SharedComponents/LoadingSpinner";

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="bg-white text-slate-600 dark:bg-gradient-to-r dark:from-[#010314] dark:to-[#0f0728]">
      <Helmet>
        <title>Music School || Home Page</title>
      </Helmet>
      <NavBar />
      <div className="min-h-[calc(100vh-68px)] pt-24 pb-10 ">
        <ScrollToTopButton />
        {isLoading ? (
          <LoadingSpinner /> // Render the loader spinner while loading
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MainPage;