import {
    createBrowserRouter,
   
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../components/SharedComponents/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
      ],
    },
  ]);