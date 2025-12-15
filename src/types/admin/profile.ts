export interface AdminProfile {
  nom: string;
  email: string;
  numero_telephone: string;
  niveau_acces: string;
  est_super_admin: boolean;
  etat_compte: string;
  date_creation: string;
}

export interface UpdateProfilePayload {
  nom: string;
  numero_telephone: string;
}
