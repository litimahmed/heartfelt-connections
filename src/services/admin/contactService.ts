import { ContactPayload, ContactResponse } from "@/types/admin/contact";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const ADMINS_URL = `${API_BASE_URL}/admins`;


export const getContact = async (): Promise<ContactResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/home/contacte/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch contact information.");
  }

  return response.json();
};

export const createContact = async (
  payload: ContactPayload
): Promise<ContactResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/contacte/ajouter/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create contact information.");
  }

  return response.json();
};

export const updateContact = async (
  payload: ContactPayload
): Promise<ContactResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/contacte/modifier/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update contact information.");
  }

  return response.json();
};
