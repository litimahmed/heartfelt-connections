export interface TranslationEntry {
  lang: 'ar' | 'fr' | 'en';
  value: string;
}

export interface AboutNousPayload {
  about_id?: string;
  titre: TranslationEntry[];
  contenu: TranslationEntry[];
  mission?: TranslationEntry[];
  vision?: TranslationEntry[];
  valeurs?: TranslationEntry[];
  pourquoi_choisir_nous?: TranslationEntry[];
  qui_nous_servons?: TranslationEntry[];
  slogan?: TranslationEntry[];
  version: number;
  active: boolean;
  date_creation?: string;
  historique_modifications?: string[];
}

export interface AboutNousResponse extends AboutNousPayload {
  id: number;
  created_at: string;
  updated_at: string;
}

// Form data structure for easier form handling
export interface AboutNousFormData {
  titre: { ar: string; fr: string; en: string };
  contenu: { ar: string; fr: string; en: string };
  mission: { ar: string; fr: string; en: string };
  vision: { ar: string; fr: string; en: string };
  valeurs: { ar: string; fr: string; en: string };
  pourquoi_choisir_nous: { ar: string; fr: string; en: string };
  qui_nous_servons: { ar: string; fr: string; en: string };
  slogan: { ar: string; fr: string; en: string };
  active: boolean;
}

// Helper to convert form data to API payload
export const formDataToPayload = (formData: AboutNousFormData): Omit<AboutNousPayload, 'version'> => {
  const toTranslationArray = (field: { ar: string; fr: string; en: string }): TranslationEntry[] => [
    { lang: 'ar', value: field.ar },
    { lang: 'fr', value: field.fr },
    { lang: 'en', value: field.en },
  ];

  return {
    titre: toTranslationArray(formData.titre),
    contenu: toTranslationArray(formData.contenu),
    mission: toTranslationArray(formData.mission),
    vision: toTranslationArray(formData.vision),
    valeurs: toTranslationArray(formData.valeurs),
    pourquoi_choisir_nous: toTranslationArray(formData.pourquoi_choisir_nous),
    qui_nous_servons: toTranslationArray(formData.qui_nous_servons),
    slogan: toTranslationArray(formData.slogan),
    active: formData.active,
  };
};
