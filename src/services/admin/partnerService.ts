import { PartnerPayload, PartnerResponse, MultilingualField } from "@/types/admin/partner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

// Convert array multilingual format [{lang, value}] to object format {ar, fr, en}
const convertMultilingualToObject = (field: MultilingualField | undefined): { ar: string; fr: string; en: string } => {
  if (!field || !Array.isArray(field)) {
    return { ar: "", fr: "", en: "" };
  }
  return {
    ar: field.find(item => item.lang === "ar")?.value || "",
    fr: field.find(item => item.lang === "fr")?.value || "",
    en: field.find(item => item.lang === "en")?.value || "",
  };
};

export const getAllPartners = async (): Promise<PartnerResponse[]> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/home/partenaire/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch partners.");
  }

  const result = await response.json();
  // Handle wrapped response: {message: "...", data: [...]}
  const data = result.data || result;
  return Array.isArray(data) ? data : [data];
};

export const getPartner = async (partnerId: number): Promise<PartnerResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/home/partenaire/${partnerId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch partner information.");
  }

  return response.json();
};

export const createPartner = async (
  payload: PartnerPayload,
  logoFile?: File,
  bannerFile?: File
): Promise<PartnerResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  
  const formData = new FormData();
  
  // Convert multilingual fields from array format to object format {ar, fr, en}
  formData.append("nom_partenaire", JSON.stringify(convertMultilingualToObject(payload.nom_partenaire)));
  formData.append("description", JSON.stringify(convertMultilingualToObject(payload.description)));
  
  // Convert adresse - combine rue, ville, pays into a single translated string
  if (payload.adresse && payload.adresse.length > 0) {
    const addr = payload.adresse[0];
    const addressObject = {
      ar: [addr.rue, addr.ville, addr.pays].map(f => f?.find(i => i.lang === "ar")?.value || "").filter(Boolean).join(", "),
      fr: [addr.rue, addr.ville, addr.pays].map(f => f?.find(i => i.lang === "fr")?.value || "").filter(Boolean).join(", "),
      en: [addr.rue, addr.ville, addr.pays].map(f => f?.find(i => i.lang === "en")?.value || "").filter(Boolean).join(", "),
    };
    formData.append("adresse", JSON.stringify(addressObject));
  }
  
  formData.append("email", payload.email);
  formData.append("telephone", payload.telephone);
  formData.append("site_web", payload.site_web);
  formData.append("actif", String(payload.actif ?? true));
  
  // type_partenaire as array of strings
  if (payload.type_partenaire) {
    formData.append("type_partenaire", JSON.stringify([payload.type_partenaire]));
  }
  
  formData.append("date_deb", payload.date_deb);
  formData.append("date_fin", payload.date_fin);
  formData.append("date_creation_entreprise", payload.date_creation_entreprise);
  formData.append("priorite_affichage", String(payload.priorite_affichage));
  
  if (payload.facebook) formData.append("facebook", payload.facebook);
  if (payload.instagram) formData.append("instagram", payload.instagram);
  if (payload.tiktok) formData.append("tiktok", payload.tiktok);
  
  // liens_externes as array of URL strings
  if (payload.liens_externes?.length) {
    const urlStrings = payload.liens_externes.map(link => link.url).filter(Boolean);
    formData.append("liens_externes", JSON.stringify(urlStrings));
  }
  
  // Add files
  if (logoFile) formData.append("logo", logoFile);
  if (bannerFile) formData.append("image_banniere", bannerFile);
  
  const response = await fetch(`${API_BASE_URL}/admins/partenaire/ajouter/`, {
    method: "POST",
    headers: {
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || JSON.stringify(errorData.details) || "Failed to create partner.");
  }

  return response.json();
};

export const updatePartner = async (
  partnerId: number,
  payload: PartnerPayload
): Promise<PartnerResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/admins/partenaire/modifier/${partnerId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update partner.");
  }

  return response.json();
};

export const deletePartner = async (partnerId: number): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/admins/partenaire/supprimer/${partnerId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete partner.");
  }
};
