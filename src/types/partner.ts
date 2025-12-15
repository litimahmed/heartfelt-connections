interface TranslationItem {
  lang: string;
  value: string;
}

interface Address {
  rue: TranslationItem[];
  ville: TranslationItem[];
  pays: TranslationItem[];
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
  nom_partenaire: TranslationItem[];
  logo?: string;
  description?: TranslationItem[];
  adresse?: Address[];
  email: string;
  telephone: string;
  site_web: string;
  date_ajout?: string;
  actif?: boolean;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  type_partenaire?: any;
  date_deb: string;
  date_fin: string;
  liens_externes?: Array<{url: string; titre: string}>;
  date_creation_entreprise: string;
  priorite_affichage: number;
  image_banniere?: string;
}
