import { Navigate, useLocation } from "react-router";
import UseAuth from "../Hooks/UseAuth";
import UseInstructor from "../Hooks/UserInstructor";
import LoadingSpinner from "../Components/SharedComponents/LoadingSpinner";


const InstructorRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const [isInstructor, isInstructorLoading] =UseInstructor()
    const location = useLocation();

    if(loading || isInstructorLoading){
        return <LoadingSpinner/>
    }

    if (user?.email && isInstructor) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default InstructorRoute;