import axios from "axios"
import toast from "react-hot-toast"


export const storeTokens = (accessToken: string) => {
    // Store access token in memory (not localStorage for better security)
    sessionStorage.setItem('accessToken', accessToken);
};

export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
};

// Configure axios instance (or fetch wrapper)
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = getAccessToken();
    // console.log("token", token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        console.log("Error-----", error)

        // Case 1: Token expired (401) + not yet retried
        if (error.response?.status === 401 && !originalRequest._retry || error?.response.data.data.includes("jwt")) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken(); // Try refresh
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest); // Retry request
            } catch (refreshError) {
                // Refresh failed → Auto-logout
                await logout();
                toast.error("Your session has expired. Please log in again.");
                // Hard redirect to landing
                return Promise.reject(refreshError);
            }
        }

        // Case 2: Other auth-related errors (403, 400, etc.)
        // if ([403, 400].includes(error.response?.status)) {
        //     await logout();
        //     toast.error("You’ve been logged out due to inactivity.");
        //     return Promise.reject(error);
        // }

        // Case 3: Network/server errors (optional)
        if (!error.response) {
            toast.error("Network error. Please check your connection.");
        }

        return Promise.reject(error);
    }
);

// Refresh token function
const refreshAccessToken = async () => {
    try {
        // Note: The refresh token is automatically sent via HTTP-only cookie
        const response = await api.post('/api/v1/auth/refresh-token');
        const { accessToken } = response.data.data;

        storeTokens(accessToken);
        return accessToken;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to refresh token');
    }
};

// Helper: Safe redirect (works in SSR/Next.js)
const redirectTo = (path: string) => {
    if (typeof window !== "undefined") {
        window.location.href = path; // Full page reload (clears state)
    }
};

// Logout function
export const logout = async () => {
    // Clear frontend tokens
    sessionStorage.removeItem('accessToken');

    // Call backend logout to clear HTTP-only cookie
    await api.post('/api/v1/auth/logout');
    toast.success("logout successful");
    redirectTo("/");
    return
};

export default api;