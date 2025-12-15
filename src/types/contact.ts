interface Translation {
    fr: string;
    ar: string;
    en: string;
}

export interface ContactData {
    titre?: Translation;
    email: string;
    telephone_1?: string;
    telephone_2?: string;
    telephone_fixe?: string;
    adresse?: Translation;
    ville?: Translation;
    wilaya?: Translation;
    horaires: string;
    site_web?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
    x?: string;
    message_acceuil?: Translation;
}
