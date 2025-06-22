import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/auth';



const fetchUser = async () => {
    const response = await api.get('/api/v1/user');
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

    return useMutation({
        mutationFn: (newUser: any) =>
            api.post('/api/v1/auth/google', { payload: newUser }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error) => {
            console.error('Failed to create user:', error);
        },
    });
};

