export interface MultilingualField {
  fr: string;
  ar: string;
  en: string;
}

export interface ContactPayload {
  titre?: MultilingualField | null;
  email: string;
  telephone_1: string;
  telephone_2: string;
  telephone_fixe: string;
  adresse: MultilingualField;
  ville: MultilingualField;
  wilaya: MultilingualField;
  horaires: string;
  site_web: string;
  facebook: string;
  instagram?: string | null;
  tiktok?: string | null;
  linkedin?: string | null;
  x?: string | null;
  message_acceuil?: MultilingualField | null;
}

export interface ContactResponse extends ContactPayload {
  id?: number;
  date_creation?: string;
  historique_modifications?: Record<string, any>;
}
