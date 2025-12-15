export interface Professional {
    professionnel_id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    ville: string;
    pays: string;
    description: string;
    categorie: string;
    siteweb: string;
    facebook: string;
    tiktok: string;
    instagram: string;
    date_creation: string;
    actif?: boolean;
}

export interface ProfessionalListResponse {
    status: boolean;
    count: number;
    data: Professional[];
}

export interface ProfessionalDetailResponse {
    status: boolean;
    data: Professional;
}

export interface ProfessionalCreatePayload {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    ville: string;
    pays: string;
    description: string;
    categorie: string;
    siteweb: string;
    facebook: string;
    tiktok: string;
    instagram: string;
}

export interface ProfessionalUpdatePayload extends ProfessionalCreatePayload {}

export interface ProfessionalMutationResponse {
    status: boolean;
    message: string;
    data: Professional;
}
