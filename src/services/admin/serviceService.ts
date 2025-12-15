/**
 * Service Service
 * 
 * API service for managing services in admin panel.
 */

import { apiClient } from "../api";
import {
  Service,
  ServiceListResponse,
  ServiceDetailResponse,
  ServiceCreateResponse,
  ServiceUpdateResponse,
  ServiceDeleteResponse,
  ServiceSuspendResponse,
} from "@/types/admin/service";

export const serviceService = {
  /**
   * Get all services for a professional
   */
  async getServices(proffessionnelId: string): Promise<Service[]> {
    const response = await apiClient.get<Service[] | ServiceListResponse>(
      `/admins/services/afficher/`,
      { proffessionnel_id: proffessionnelId }
    );
    
    // Handle both array response and object with data property
    if (Array.isArray(response)) {
      return response;
    }
    return response.data || [];
  },

  /**
   * Get a single service by ID
   */
  async getServiceById(serviceId: string): Promise<Service> {
    const response = await apiClient.get<Service | ServiceDetailResponse>(
      `/admins/services/afficher_detail/${serviceId}/`
    );
    
    // Handle both direct response and object with data property
    if ('service_id' in response) {
      return response as Service;
    }
    return (response as ServiceDetailResponse).data;
  },

  /**
   * Create a new service with FormData (supports file upload)
   */
  async createService(formData: FormData): Promise<ServiceCreateResponse> {
    return apiClient.postFormData<ServiceCreateResponse>(`/admins/services/ajouter/`, formData);
  },

  /**
   * Update an existing service with FormData (supports file upload)
   */
  async updateService(serviceId: string, formData: FormData): Promise<ServiceUpdateResponse> {
    return apiClient.putFormData<ServiceUpdateResponse>(`/admins/services/modifier/${serviceId}/`, formData);
  },

  /**
   * Delete a service permanently
   */
  async deleteService(serviceId: string): Promise<ServiceDeleteResponse> {
    return apiClient.delete<ServiceDeleteResponse>(`/admins/services/supprimer/${serviceId}/`);
  },

  /**
   * Suspend a service (set actif = false)
   */
  async suspendService(serviceId: string): Promise<ServiceSuspendResponse> {
    return apiClient.put<ServiceSuspendResponse>(`/admins/services/suspendre/${serviceId}/`, {});
  },
};
