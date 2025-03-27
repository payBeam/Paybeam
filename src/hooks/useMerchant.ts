import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/auth';



const fetchMerchant = async () => {
    const response = await api.get('/api/merchant');
    return response.data; // Axios wraps response in `data`
};

export const useMerchant = () => {
    return useQuery({
        queryKey: ['merchant'], // Unique cache key
        queryFn: fetchMerchant,
        staleTime: 1000 * 60 * 5, // 5 minutes until stale
    });
};


export const useCreateMerchant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newMerchant: { name: string; description: string }) =>
            api.post('/api/merchant/create', newMerchant),
        onSuccess: () => {
            // Invalidate cache to refetch merchant
            queryClient.invalidateQueries({ queryKey: ['merchant'] });
        },
        onError: (error) => {
            console.error('Failed to create merchant:', error);
        },
    });
};

