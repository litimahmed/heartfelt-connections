import { apiClient } from "@/services/api";
import { AdminProfile, UpdateProfilePayload } from "@/types/admin/profile";

export const getAdminProfile = async (): Promise<AdminProfile> => {
  return apiClient.get<AdminProfile>("/admins/compte/afficher");
};

export const updateAdminProfile = async (data: UpdateProfilePayload): Promise<AdminProfile> => {
  return apiClient.put<AdminProfile>("/admins/compte/modifier", data);
};
