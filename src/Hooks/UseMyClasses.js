import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosSecure from './useAxiosSecure';
const UseMyClass = () => {
  const { user,loading } =UseAuth()
  // const token = localStorage.getItem('jwt-token')
  const [axiosSecure]=useAxiosSecure()
  const {data:myClass=[],refetch} = useQuery({
    queryKey: ['myClass', user?.email],
    enabled: !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure(`http://localhost:5000/instructorClass?email=${user?.email}`)
      // console.log("response from axios",response.data);
      return response.data
    },
  })

  return [myClass,refetch]
}
export default UseMyClass