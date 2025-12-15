// Array format from some API responses
interface TranslationItem {
  lang: string;
  value: string;
}

// Object format from API responses {ar, fr, en}
interface TranslationObject {
  ar?: string;
  fr?: string;
  en?: string;
}

// Flexible type that handles both formats
export type TranslatableField = TranslationItem[] | TranslationObject | string | undefined;

interface Address {
  rue: TranslatableField;
  ville: TranslatableField;
  pays: TranslatableField;
}

export interface PartnerLinks {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  [key: string]: string | undefined;
}

export interface PartnerContactInfo {
  [key: string]: any;
}

export interface Partner {
  partenaire_id?: string;
  id?: number;
  nom_partenaire: TranslatableField;
  logo?: string;
  description?: TranslatableField;
  adresse?: TranslatableField | Address[];
  email: string;
  telephone: string;
  site_web: string;
  date_ajout?: string;
  actif?: boolean;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  type_partenaire?: string | string[];
  date_deb: string;
  date_fin: string;
  liens_externes?: string[] | Array<{url: string; titre: string}>;
  date_creation_entreprise: string;
  priorite_affichage: number;
  image_banniere?: string;
}

// Helper function to extract translated value from flexible field
export const getTranslatedValue = (field: TranslatableField, language: string): string => {
  if (!field) return '';
  
  // If it's a string, return it directly
  if (typeof field === 'string') return field;
  
  // If it's an array [{lang, value}]
  if (Array.isArray(field)) {
    const item = field.find((i: TranslationItem) => i.lang === language) 
      || field.find((i: TranslationItem) => i.lang === 'en')
      || field.find((i: TranslationItem) => i.lang === 'fr')
      || field[0];
    return (item as TranslationItem)?.value || '';
  }
  
  // If it's an object {ar, fr, en}
  if (typeof field === 'object') {
    const obj = field as TranslationObject;
    return obj[language as keyof TranslationObject] || obj.en || obj.fr || obj.ar || '';
  }
  
  return '';
};
