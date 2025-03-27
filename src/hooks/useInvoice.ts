import { useQuery,  useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/auth';

enum TokenType {
    USDC = "USDC",
    XLM = "XLM"
}

const fetchInvoices = async () => {
    const response = await api.get('/api/invoice');
    return response.data; // Axios wraps response in `data`
};

export const useInvoices = () => {
    return useQuery({
        queryKey: ['invoice'], // Unique cache key
        queryFn: fetchInvoices,
        staleTime: 1000 * 60 * 5, // 5 minutes until stale
    });
};


export const useCreateInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newInvoice: { title: string; description: string; tokenType: TokenType; amount:number  }) =>
            api.post('/api/invoice/create', newInvoice),
        onSuccess: () => {
            // Invalidate cache to refetch posts
            queryClient.invalidateQueries({ queryKey: ['invoicea'] });
        },
        onError: (error) => {
            console.error('Failed to create post:', error);
        },
    });
};

