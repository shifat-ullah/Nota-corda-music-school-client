import { useQuery } from "@tanstack/react-query"
const UseallInstructor = () => {

  const {data:allInstructor=[],isLoading:loading,refetch} = useQuery({
    queryKey: ['allInstructor'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/instructors')
      return res.json()
    }
  })
  return [allInstructor,loading,refetch]
}
export default UseallInstructor
