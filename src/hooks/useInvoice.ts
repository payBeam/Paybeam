import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
        mutationFn: ({ title, description, tokenType, amount }: {
            title: string;
            description: string;
            tokenType: TokenType;
            amount: number;
        }) => api.post("/api/invoice/create", { title, description, tokenType, amount }),

        onSuccess: () => {
            // Invalidate cache to refetch invoices
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
        },

        onError: (error) => {
            console.error("Failed to create invoice:", error);
        },
    })
};



const fetchInvoiceById = async (id: string) => {
    const response = await api.get(`/api/invoice-settlement/${id}`);
    return response.data; // Axios wraps response in `data`
};

export const useInvoice = (id: string) => {
    return useQuery({
        queryKey: ["invoice", id], // Unique cache key per ID
        queryFn: () => fetchInvoiceById(id),
        enabled: !!id, // Only run query if `id` exists
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
};
