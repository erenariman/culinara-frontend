import axios from 'axios';

// Create a configured axios instance
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '', 
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log("Current API BaseURL:", api.defaults.baseURL);

// Request interceptor: Inject JWT Auth token
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Response interceptor: Unwrap { success, data, errorMessage, } and handle errors
api.interceptors.response.use(
    (response) => {
        // Assume all backend responses and our proxy responses are mapped to the new Clean Architecture schema
        const payload = response.data;
        
        // If the wrapper structure is purely { success: true, data: ... }
        if (payload && typeof payload === 'object' && 'success' in payload) {
            if (!payload.success) {
                return Promise.reject(new Error(payload.errorMessage || 'An error occurred.'));
            }
            
            // Re-assign the unwrapped 'data' to the response 'data' so existing logic accessing `res.data` gets the real content.
            // But note: Pagination endpoint returns { success, data, total_records, total_pages, current_page, limit }
            if ('total_records' in payload) {
                response.data = {
                    data: payload.data,
                    total: payload.total_records,
                    page: payload.current_page,
                    size: payload.limit
                };
            } else {
                response.data = payload.data;
            }
        }
        
        return response;
    },
    (error) => {
        if (error.response) {
            const payload = error.response.data;
            const message = payload?.message || error.response.statusText || 'An error occurred';
            const code = payload?.code;
            
            // Handle specific status codes and domain model error codes
            if (code === 'INVALID_TOKEN' || code === 'INVALID_CREDENTIALS' || error.response.status === 401) {
                // Trigger logout or redirect
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                    if (window.location.pathname !== '/signin') {
                        window.location.href = '/signin';
                    }
                }
            } else if (code === 'PERMISSION_DENIED' || error.response.status === 403) {
                // Just log, let component handle if needed, or use a non-blocking notification
                console.error("Forbidden resource accessed:", message);
            } else if (code === 'RATE_LIMIT_EXCEEDED' || error.response.status === 429) {
                if (typeof window !== 'undefined') {
                    alert(message || "Çok fazla istek attınız. Lütfen biraz bekleyip tekrar deneyin.");
                }
            }
            return Promise.reject(new Error(message));
        }
        return Promise.reject(error);
    }
);

export default api;
