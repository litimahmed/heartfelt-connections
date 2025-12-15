import { TermsAndConditions, TermsAndConditionsFormData } from "@/types/admin/termsAndConditions";
import { authenticatedFetch } from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export const termsAndConditionsService = {
  async getAll(): Promise<TermsAndConditions[]> {
    const response = await authenticatedFetch(`${API_BASE_URL}/home/condition_dutilisation/`, {
      method: "GET",
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch terms and conditions");
    }
    
    const result = await response.json();
    const data = result.data || result;
    return Array.isArray(data) ? data : [data];
  },

  async create(data: TermsAndConditionsFormData): Promise<TermsAndConditions> {
    const response = await authenticatedFetch(`${API_BASE_URL}/admins/condition_dutilisation/ajouter/`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error("Failed to create terms and conditions");
    }
    
    return response.json();
  },

  async update(conditionId: string, data: TermsAndConditionsFormData): Promise<TermsAndConditions> {
    const response = await authenticatedFetch(`${API_BASE_URL}/admins/condition_dutilisation/modifier/?condition_id=${conditionId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update terms and conditions");
    }
    
    return response.json();
  },
};
