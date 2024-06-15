import { useQuery } from "@tanstack/react-query"
const UseAllClass = () => {

  const {data:allClass=[],refetch,isLoading:loading} = useQuery({
    queryKey: ['allClass'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/allClass')
      return res.json()
    }
  })
  return [allClass,refetch,loading]
}
export default UseAllClass
