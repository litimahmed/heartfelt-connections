/**
 * Service Types
 * 
 * Type definitions for admin service management.
 */

export interface Service {
  service_id: string;
  nom_service: string;
  description_service: string;
  prix_service: number;
  duree_moyenne: number;
  actif: boolean;
  date_creation: string;
  photo_principale: string;
  options: string;
  jours_de_travail: string;
  jours_de_repos: string;
  jours_de_conge: string;
  categorie: string;
  proffessionnel_id: string;
}

export interface ServiceListResponse {
  status?: boolean;
  count?: number;
  data: Service[];
}

export interface ServiceDetailResponse {
  status?: boolean;
  data: Service;
}

export interface ServiceCreateResponse {
  status: boolean;
  message: string;
  data: Service;
}

export interface ServiceUpdateResponse {
  status: boolean;
  message: string;
  data: Service;
}

export interface ServiceDeleteResponse {
  status: boolean;
  message: string;
}

export interface ServiceSuspendResponse {
  status: boolean;
  message: string;
  data?: Service;
}
