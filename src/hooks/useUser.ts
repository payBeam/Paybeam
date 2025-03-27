import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/auth';
import { addProfile } from "@/redux/slice/ProfileSlice";
import { storeTokens } from "@/utils/auth";
import { useAppDispatch } from "@/redux/hook";


const fetchUser = async () => {
    const response = await api.get('/api/user');
    return response.data; // Axios wraps response in `data`
};

export const useUser = () => {
    return useQuery({
        queryKey: ['user'], // Unique cache key
        queryFn: fetchUser,
        staleTime: 1000 * 60 * 5, // 5 minutes until stale
    });
};


export const useCreateUser = () => {
    const queryClient = useQueryClient();
       const dispatch = useAppDispatch();

    return useMutation({
        mutationFn: (newUser: any) =>
            api.post('/api/auth/google', newUser),
        onSuccess: (data) => {
            storeTokens(data.data.accessToken);
            dispatch(addProfile(data.data.user))
            // Update cache with new user data
            queryClient.setQueryData(['user'], data.data.user);


            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error) => {
            console.error('Failed to create user:', error);
        },
    });
};

