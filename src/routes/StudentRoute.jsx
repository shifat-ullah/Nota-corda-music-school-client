import { Navigate, useLocation } from "react-router";
import UseAuth from "../Hooks/UseAuth";
import LoadingSpinner from "../Components/SharedComponents/LoadingSpinner";
import UseIsStudent from "../Hooks/UseIsStudent";


const StudentRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const [isStudent, isStudentLoading] = UseIsStudent()
  const location = useLocation();

  if (loading || isStudentLoading) {
    return <LoadingSpinner />
  }

  if (user?.email && isStudent) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default StudentRoute;