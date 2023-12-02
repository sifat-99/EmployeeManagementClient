// import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useEmployee = () => {
    const axiosPublic = useAxiosPublic();
    // const { user} = useAuth();
    const { refetch, data: AllData = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const res = await axiosPublic.get(`/users`);
            return res.data;
        }
    })

    return [AllData, refetch]
};

export default useEmployee;