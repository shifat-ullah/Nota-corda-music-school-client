import { useQuery } from "@tanstack/react-query"
import UseAuth from "./UseAuth"
import useAxiosSecure from "./useAxiosSecure"

const UseInstructor = () => {
  const [axiosSecure] = useAxiosSecure()
  const { user, loading } = UseAuth()
  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ['isInstructor', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      if (!loading && user?.email) {
        const res = await axiosSecure(`/users/instructor/${user?.email}`)
        // console.log('isInstructor', res.data);
        return res.data.instructor
      }
    }
  })
  return [isInstructor, isInstructorLoading]
}
export default UseInstructor
