import { apiClient } from "../api";
import {
  Professional,
  ProfessionalListResponse,
  ProfessionalDetailResponse,
  ProfessionalCreatePayload,
  ProfessionalUpdatePayload,
  ProfessionalMutationResponse,
} from "@/types/admin/professional";

export const getProfessionals = async (): Promise<Professional[]> => {
  try {
    const response = await apiClient.get<ProfessionalListResponse | { status: boolean; message: string }>(
      "/admins/professionnels/afficher/"
    );
    
    // Handle successful response with data
    if ('data' in response && response.status && Array.isArray(response.data)) {
      return response.data;
    }
    
    // Handle empty/no data response
    return [];
  } catch (error: any) {
    // Handle 404 / "no professionals found" as empty state
    const errorMessage = error?.message?.toLowerCase() || "";
    if (
      errorMessage.includes("404") ||
      errorMessage.includes("not found") ||
      errorMessage.includes("aucun professionnel") ||
      errorMessage.includes("professionnel trouvé")
    ) {
      return [];
    }
    throw error;
  }
};

export const getProfessionalById = async (id: string): Promise<Professional> => {
  const response = await apiClient.get<ProfessionalDetailResponse>(
    `/admins/professionnels/afficher/${id}/`
  );
  return response.data;
};

export const createProfessional = async (
  payload: ProfessionalCreatePayload
): Promise<ProfessionalMutationResponse> => {
  const response = await apiClient.post<ProfessionalMutationResponse>(
    "/admins/professionnels/ajouter/",
    payload
  );
  return response;
};

export const updateProfessional = async (
  id: string,
  payload: ProfessionalUpdatePayload
): Promise<ProfessionalMutationResponse> => {
  const response = await apiClient.put<ProfessionalMutationResponse>(
    `/admins/professionnels/modifier/${id}/`,
    payload
  );
  return response;
};

export const activateProfessional = async (id: string): Promise<void> => {
  await apiClient.put(`/admins/professionnels/activer/${id}/`);
};

export const deactivateProfessional = async (id: string): Promise<void> => {
  await apiClient.put(`/admins/professionnels/desactiver/${id}/`);
};

export const deleteProfessional = async (id: string): Promise<void> => {
  await apiClient.delete(`/admins/professionnels/supprimer/${id}/`);
};
