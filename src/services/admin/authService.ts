import { LoginPayload, LoginResponse } from "@/types/admin/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const AUTH_URL = `${API_BASE_URL}/auth/Admin`;

export const loginAdmin = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await fetch(`${AUTH_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An unknown error occurred.");
  }

  return response.json();
};

export const logoutAdmin = async (accessToken?: string, refreshToken?: string): Promise<void> => {
  const response = await fetch(`${AUTH_URL}/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Logout failed.");
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");
  
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${AUTH_URL}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      // Refresh token is also invalid/expired
      console.warn("Token refresh failed with status:", response.status);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    }

    const data = await response.json();
    const newAccessToken = data.access;
    
    // Some backends also return a new refresh token (token rotation)
    if (data.refresh) {
      localStorage.setItem("refreshToken", data.refresh);
    }
    
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    }
    
    return null;
  } catch (error) {
    console.error("Token refresh error:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
};

// Authenticated fetch with automatic token refresh
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const accessToken = localStorage.getItem("accessToken");
  
  const headers = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers,
  };

  let response = await fetch(url, { ...options, headers });

  // If unauthorized, try to refresh token and retry
  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    
    if (newToken) {
      // Retry with new token
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${newToken}`,
      };
      response = await fetch(url, { ...options, headers: retryHeaders });
    } else {
      // Refresh failed, redirect to login
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }
  }

  return response;
};
