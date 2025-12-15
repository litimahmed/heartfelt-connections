// Multilingual field as array format from API
export interface MultilingualItem {
  lang: "fr" | "ar" | "en";
  value: string;
}

export type MultilingualField = MultilingualItem[];

// Address structure
export interface AddressField {
  rue: MultilingualField;
  ville: MultilingualField;
  pays: MultilingualField;
}

// External link structure
export interface ExternalLink {
  url: string;
  titre: string;
}

export interface PartnerPayload {
  nom_partenaire: MultilingualField;
  description: MultilingualField;
  adresse: AddressField[];
  email: string;
  telephone: string;
  site_web: string;
  actif?: boolean;
  facebook?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  type_partenaire?: string;
  date_deb: string;
  date_fin: string;
  liens_externes?: ExternalLink[];
  date_creation_entreprise: string;
  priorite_affichage: number;
  logo?: string;
  image_banniere?: string;
}

export interface PartnerResponse extends PartnerPayload {
  id?: number;
  date_ajout?: string;
}

// Helper function to get value from multilingual field
export const getMultilingualValue = (field: MultilingualField | undefined, preferredLang: "en" | "fr" | "ar" = "en"): string => {
  if (!field || !Array.isArray(field)) return "";
  
  // Try preferred language first
  const preferred = field.find(item => item.lang === preferredLang);
  if (preferred?.value) return preferred.value;
  
  // Fallback order: en -> fr -> ar -> first available
  const en = field.find(item => item.lang === "en");
  if (en?.value) return en.value;
  
  const fr = field.find(item => item.lang === "fr");
  if (fr?.value) return fr.value;
  
  const ar = field.find(item => item.lang === "ar");
  if (ar?.value) return ar.value;
  
  return field[0]?.value || "";
};

export const TYPE_PARTENAIRE_OPTIONS = [
  "COMMERCIAL",
  "MARKETING",
  "TECHNIQUE",
  "MEDIA",
  "AUTRE"
] as const;
