/**
 * Category Types for Admin
 * 
 * Type definitions for category management in the admin panel.
 */

export interface Category {
  categorie_id: string | number;
  nom_categorie: string;
  description_categorie: string;
  couleur_theme: string;
  ordre_affichage: number;
  photo_principale_cat: string;
  active: boolean;
  date_creation: string;
}

export interface CategoryListResponse {
  status: boolean;
  count: number;
  data: Category[];
}

export interface CategoryCreateRequest {
  nom_categorie: string;
  description_categorie: string;
  couleur_theme: string;
  ordre_affichage: number;
  photo_principale_cat: string;
  active: boolean;
}

export interface CategoryCreateResponse {
  status: boolean;
  message: string;
  data: Category;
}

export interface CategoryUpdateRequest {
  nom_categorie: string;
  description_categorie: string;
  couleur_theme: string;
  ordre_affichage: number;
  photo_principale_cat: string;
  active: boolean;
}

export interface CategoryUpdateResponse {
  status: boolean;
  message: string;
  data: Category;
}

export interface CategoryDeleteResponse {
  status: boolean;
  message: string;
}

export interface CategorySuspendResponse {
  status: boolean;
  message: string;
  data: Category;
}
