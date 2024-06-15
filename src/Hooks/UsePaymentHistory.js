import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosSecure from './useAxiosSecure';
const UsePaymentHistory = () => {
  const { user,loading } =UseAuth()
  // const token = localStorage.getItem('jwt-token')
  const [axiosSecure]=useAxiosSecure()
  const {data:payHistory=[],refetch} = useQuery({
    queryKey: ['payHistory', user?.email],
    enabled: !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const response = await axiosSecure(`https://nota-corda-music-school-server.vercel.app//paymentHistory?email=${user?.email}`)
      // console.log("response from axios",response.data);
      return response.data
    },
  })

  return [payHistory,refetch]
}
export default UsePaymentHistory