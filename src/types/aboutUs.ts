interface TranslationEntry {
    lang: 'ar' | 'fr' | 'en';
    value: string;
}

export interface AboutUsData {
    titre?: TranslationEntry[];
    slogan?: TranslationEntry[];
    contenu?: TranslationEntry[];
    mission?: TranslationEntry[];
    vision?: TranslationEntry[];
    valeurs?: TranslationEntry[];
    pourquoi_choisir_nous?: TranslationEntry[];
    qui_nous_servons?: TranslationEntry[];
    version?: number;
    active?: boolean;
}
