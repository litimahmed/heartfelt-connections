import { refreshAccessToken } from "@/services/admin/authService";

const BASE_URL = import.meta.env.VITE_DJANGO_API_URL || 'http://127.0.0.1:8000/api';

// Track if we're currently refreshing to prevent multiple refresh calls
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('accessToken');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

const handleUnauthorized = async (): Promise<string | null> => {
    // If already refreshing, wait for the existing promise
    if (isRefreshing && refreshPromise) {
        return refreshPromise;
    }

    isRefreshing = true;
    refreshPromise = refreshAccessToken();

    try {
        const newToken = await refreshPromise;
        if (!newToken) {
            // Dispatch logout event to redirect to login
            window.dispatchEvent(new CustomEvent("auth:logout"));
            return null;
        }
        return newToken;
    } finally {
        isRefreshing = false;
        refreshPromise = null;
    }
};

export const apiClient = {
    async post<T>(endpoint: string, data?: any): Promise<T> {
        let response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: data ? JSON.stringify(data) : undefined,
        });

        // Handle 401 - try refresh token
        if (response.status === 401) {
            const newToken = await handleUnauthorized();
            if (newToken) {
                response = await fetch(`${BASE_URL}${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`,
                    },
                    body: data ? JSON.stringify(data) : undefined,
                });
            } else {
                throw new Error('Session expired. Please login again.');
            }
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || errorData.message || `API Error: ${response.statusText}`);
        }

        return response.json();
    },

    async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        let url = `${BASE_URL}${endpoint}`;
        if (params) {
            const searchParams = new URLSearchParams(params);
            url += `?${searchParams.toString()}`;
        }

        let response = await fetch(url, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        // Handle 401 - try refresh token
        if (response.status === 401) {
            const newToken = await handleUnauthorized();
            if (newToken) {
                response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`,
                    },
                });
            } else {
                throw new Error('Session expired. Please login again.');
            }
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || errorData.message || `API Error: ${response.statusText}`);
        }

        return response.json();
    },

    async put<T>(endpoint: string, data?: any): Promise<T> {
        let response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: data ? JSON.stringify(data) : undefined,
        });

        // Handle 401 - try refresh token
        if (response.status === 401) {
            const newToken = await handleUnauthorized();
            if (newToken) {
                response = await fetch(`${BASE_URL}${endpoint}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`,
                    },
                    body: data ? JSON.stringify(data) : undefined,
                });
            } else {
                throw new Error('Session expired. Please login again.');
            }
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || errorData.message || `API Error: ${response.statusText}`);
        }

        return response.json();
    },

    async delete<T>(endpoint: string): Promise<T> {
        let response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });

        // Handle 401 - try refresh token
        if (response.status === 401) {
            const newToken = await handleUnauthorized();
            if (newToken) {
                response = await fetch(`${BASE_URL}${endpoint}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`,
                    },
                });
            } else {
                throw new Error('Session expired. Please login again.');
            }
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || errorData.message || `API Error: ${response.statusText}`);
        }

        return response.json();
    },

    async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
        const token = localStorage.getItem('accessToken');
        const headers: Record<string, string> = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        let response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: formData,
        });

        // Handle 401 - try refresh token
        if (response.status === 401) {
            const newToken = await handleUnauthorized();
            if (newToken) {
                response = await fetch(`${BASE_URL}${endpoint}`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${newToken}` },
                    body: formData,
                });
            } else {
                throw new Error('Session expired. Please login again.');
            }
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || errorData.message || `API Error: ${response.statusText}`);
        }

        return response.json();
    },

    async putFormData<T>(endpoint: string, formData: FormData): Promise<T> {
        const token = localStorage.getItem('accessToken');
        const headers: Record<string, string> = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        let response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: formData,
        });

        // Handle 401 - try refresh token
        if (response.status === 401) {
            const newToken = await handleUnauthorized();
            if (newToken) {
                response = await fetch(`${BASE_URL}${endpoint}`, {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${newToken}` },
                    body: formData,
                });
            } else {
                throw new Error('Session expired. Please login again.');
            }
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || errorData.message || `API Error: ${response.statusText}`);
        }

        return response.json();
    },
};