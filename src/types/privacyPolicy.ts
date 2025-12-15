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

export interface PrivacyPolicyData {
  politique_id?: string;
  titre?: LangValue[] | MultilingualText;
  contenu?: ContentSection[] | MultilingualText;
  version?: number;
  active?: boolean;
  date_creation?: string;
  historique_modifications?: string[];
}
