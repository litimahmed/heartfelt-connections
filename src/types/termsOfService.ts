export interface LangValue {
  lang: string;
  value: string;
}

export interface MultilingualText {
  ar?: string;
  fr?: string;
  en?: string;
}

export interface ContentSection {
  type: 'intro' | 'section';
  text?: MultilingualText;
  titre?: MultilingualText;
  paragraphe?: MultilingualText;
}

export interface TermsOfServiceData {
  condition_id?: string;
  titre?: LangValue[] | MultilingualText;
  contenu?: ContentSection[] | MultilingualText;
  version?: number;
  date_creation?: string;
  active?: boolean;
  historique_modifications?: string[];
}
