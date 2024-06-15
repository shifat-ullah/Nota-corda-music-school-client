import { Navigate, useLocation } from "react-router";
import UseAuth from "./src/Hooks/UseAuth";
import LoadingSpinner from "./src/Components/SharedComponents/LoadingSpinner";
import UseIsStudent from "./src/Hooks/UseIsUser";


const StudentRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const [isStudent,isStudentLoading] = UseIsStudent()
    const location = useLocation();

    if(loading || isStudentLoading){
        return <LoadingSpinner/>
    }

    if (user && isStudent) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default StudentRoute;