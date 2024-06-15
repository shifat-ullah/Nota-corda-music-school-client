import { useQuery } from "@tanstack/react-query"
const UseAllUsers = () => {

  const {data:allUsers=[],refetch,isLoading:loading} = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await fetch('https://nota-corda-music-school-server.vercel.app//allUsers')
      return res.json()
    }
  })
  return [allUsers,refetch,loading]
}
export default UseAllUsers
