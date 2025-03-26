import axios from "axios"


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

        // If 401 and not already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh token
                const newAccessToken = await refreshAccessToken();

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed - log user out
                logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Refresh token function
const refreshAccessToken = async () => {
    try {
        // Note: The refresh token is automatically sent via HTTP-only cookie
        const response = await axios.post('/api/auth/refresh-token');
        const { accessToken } = response.data.data;

        storeTokens(accessToken);
        return accessToken;
    } catch (error) {
        throw new Error('Failed to refresh token');
    }
};

// Logout function
export const logout = () => {
    // Clear frontend tokens
    sessionStorage.removeItem('accessToken');

    // Call backend logout to clear HTTP-only cookie
    return api.post('/api/auth/logout');
};

export default api;