import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosSecure from './useAxiosSecure';
const UseSelectClass = () => {
  const { user,loading } =UseAuth()
  // const token = localStorage.getItem('jwt-token')
  const [axiosSecure]=useAxiosSecure()
  const {data:selectClass=[],refetch} = useQuery({
    queryKey: ['selectClass', user?.email],
    enabled: !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure(`https://nota-corda-music-school-server.vercel.app//selectClasses?email=${user?.email}`)
      // console.log("response from axios",response.data);
      return response.data
    },
  })

  return [selectClass,refetch]
}
export default UseSelectClass