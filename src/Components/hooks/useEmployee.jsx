// import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useEmployee = () => {
    const axiosSecure = useAxiosSecure();
    // const { user} = useAuth();
    const { refetch, data: AllData = [] } = useQuery({
        queryKey: ['employee'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/Employees`);
            return res.data;
        }
    })

    return [AllData, refetch]
};

export default useEmployee;