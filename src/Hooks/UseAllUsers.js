import { useQuery } from "@tanstack/react-query"
const UseAllUsers = () => {

  const {data:allUsers=[],refetch,isLoading:loading} = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/allUsers')
      return res.json()
    }
  })
  return [allUsers,refetch,loading]
}
export default UseAllUsers
