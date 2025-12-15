import { PrivacyPolicy, PrivacyPolicyFormData } from "@/types/admin/privacyPolicy";
import { authenticatedFetch } from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export const privacyPolicyService = {
  async getAll(): Promise<PrivacyPolicy[]> {
    const response = await authenticatedFetch(`${API_BASE_URL}/home/politique_confidentialite/`, {
      method: "GET",
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch privacy policies");
    }
    
    const result = await response.json();
    const data = result.data || result;
    // Return empty array if no valid data
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return [];
    }
    // Only wrap in array if it's a valid object with required fields
    if (Array.isArray(data)) {
      return data.filter((item: any) => item && item.politique_id);
    }
    return data.politique_id ? [data] : [];
  },

  async create(data: PrivacyPolicyFormData): Promise<PrivacyPolicy> {
    const response = await authenticatedFetch(`${API_BASE_URL}/admins/politique_confidentialite/ajouter/`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error("Failed to create privacy policy");
    }
    
    return response.json();
  },

  async update(id: number, data: PrivacyPolicyFormData): Promise<PrivacyPolicy> {
    const response = await authenticatedFetch(`${API_BASE_URL}/admins/politique_confidentialite/modifier/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update privacy policy");
    }
    
    return response.json();
  },
};
