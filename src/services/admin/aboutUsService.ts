import { AboutNousPayload, AboutNousResponse } from "@/types/admin/aboutUs";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const ADMINS_URL = `${API_BASE_URL}/admins`;

export const getAllAboutUs = async (): Promise<AboutNousResponse[]> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/home/aboutnous/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch About Us versions.");
  }

  const result = await response.json();
  // Handle both array response and { data: [] } response
  return Array.isArray(result) ? result : (result.data || []);
};

export const getActiveAboutUs = async (): Promise<AboutNousResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/home/aboutnous/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch active About Us.");
  }

  return response.json();
};

export const createAboutNous = async (
  payload: AboutNousPayload
): Promise<AboutNousResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  
  // Generate about_id and date_creation (version comes from payload now)
  const finalPayload = {
    ...payload,
    about_id: `about${Date.now()}`,
    date_creation: new Date().toISOString(),
    historique_modifications: [`Création le ${new Date().toISOString()}`],
  };

  const response = await fetch(`${ADMINS_URL}/AboutNous/ajouter/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(finalPayload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || "Failed to create About Us content.");
  }

  return response.json();
};

export const updateAboutUs = async (
  aboutId: string,
  payload: AboutNousPayload
): Promise<AboutNousResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/AboutNous/modifier/${aboutId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update About Us.");
  }

  return response.json();
};

export const toggleAboutUsActive = async (aboutId: string): Promise<AboutNousResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/AboutNous/activate/${aboutId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to activate About Us version.");
  }

  return response.json();
};

export const getAboutUsById = async (aboutId: string): Promise<AboutNousResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/AboutNous/${aboutId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch About Us by ID.");
  }

  return response.json();
};

