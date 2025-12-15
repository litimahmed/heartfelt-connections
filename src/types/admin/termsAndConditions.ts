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

export interface TermsAndConditions {
  id?: number;
  condition_id?: string;
  titre: MultilingualField;
  introduction?: MultilingualField;
  sections: ContentSection[];
  version: number;
  active: boolean;
  date_creation?: string;
}

export interface TermsAndConditionsFormData {
  titre: MultilingualField;
  introduction: MultilingualField;
  sections: ContentSection[];
  version: number;
  active: boolean;
}
