/**
 * Category Service for Admin
 * 
 * Handles all API calls related to category management.
 */

import { apiClient } from "@/services/api";
import { 
  CategoryListResponse, 
  CategoryCreateResponse,
  CategoryUpdateResponse,
  CategoryDeleteResponse,
  CategorySuspendResponse
} from "@/types/admin/category";

export const categoryService = {
  /**
   * Fetch all categories
   */
  async getCategories(): Promise<CategoryListResponse> {
    return apiClient.get<CategoryListResponse>("/admins/categories/afficher/");
  },

  /**
   * Create a new category with FormData (supports file upload)
   */
  async createCategory(formData: FormData): Promise<CategoryCreateResponse> {
    return apiClient.postFormData<CategoryCreateResponse>("/admins/categories/ajouter/", formData);
  },

  /**
   * Update an existing category with FormData (supports file upload)
   */
  async updateCategory(categoryId: string | number, formData: FormData): Promise<CategoryUpdateResponse> {
    return apiClient.putFormData<CategoryUpdateResponse>(`/admins/categories/modifier/${categoryId}/`, formData);
  },

  /**
   * Delete a category permanently
   */
  async deleteCategory(categoryId: string | number): Promise<CategoryDeleteResponse> {
    return apiClient.delete<CategoryDeleteResponse>(`/admins/categories/supprimer/${categoryId}/`);
  },

  /**
   * Suspend a category (set active = false)
   */
  async suspendCategory(categoryId: string | number): Promise<CategorySuspendResponse> {
    return apiClient.put<CategorySuspendResponse>(`/admins/categories/suspendre/${categoryId}/`, {});
  },

  /**
   * Resume/Activate a category (set active = true)
   */
  async resumeCategory(categoryId: string | number): Promise<CategorySuspendResponse> {
    return apiClient.put<CategorySuspendResponse>(`/admins/categories/activer/${categoryId}/`, {});
  },
};


