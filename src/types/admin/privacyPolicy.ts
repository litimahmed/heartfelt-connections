export interface MultilingualField {
  ar: string;
  fr: string;
  en: string;
}

export interface ContentSection {
  id: string;
  titre: MultilingualField;
  paragraphe: MultilingualField;
}

export interface PrivacyPolicy {
  id?: number;
  politique_id?: string;
  titre: MultilingualField;
  introduction?: MultilingualField;
  sections: ContentSection[];
  version: number;
  active: boolean;
  date_creation?: string;
}

export interface PrivacyPolicyFormData {
  titre: MultilingualField;
  introduction: MultilingualField;
  sections: ContentSection[];
  version: number;
  active: boolean;
}
