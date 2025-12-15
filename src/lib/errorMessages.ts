/**
 * Error Message Mapping Utility
 *
 * Maps backend error messages to user-friendly, localized messages.
 * Prevents exposing technical backend errors to users.
 */

type Language = 'en' | 'fr' | 'ar';

interface ErrorMessages {
    [key: string]: {
        en: string;
        fr: string;
        ar: string;
    };
}

const errorMessages: ErrorMessages = {
    // Authentication Errors
    invalid_credentials: {
        en: "Invalid email or password. Please try again.",
        fr: "Email ou mot de passe invalide. Veuillez réessayer.",
        ar: "البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مرة أخرى."
    },
    account_deactivated: {
        en: "Your account has been deactivated. Please contact the administrator.",
        fr: "Votre compte a été désactivé. Veuillez contacter l'administrateur.",
        ar: "تم إلغاء تنشيط حسابك. يرجى الاتصال بالمسؤول."
    },
    account_not_found: {
        en: "No account found with this email address.",
        fr: "Aucun compte trouvé avec cette adresse email.",
        ar: "لم يتم العثور على حساب بهذا البريد الإلكتروني."
    },
    session_expired: {
        en: "Your session has expired. Please log in again.",
        fr: "Votre session a expiré. Veuillez vous reconnecter.",
        ar: "انتهت صلاحية جلستك. يرجى تسجيل الدخول مرة أخرى."
    },

    // Phone Number Errors
    invalid_phone_format: {
        en: "Invalid phone format. Use international format: +213XXXXXXXXX (13 characters)",
        fr: "Format de téléphone invalide. Utilisez le format international: +213XXXXXXXXX (13 caractères)",
        ar: "تنسيق الهاتف غير صالح. استخدم التنسيق الدولي: +213XXXXXXXXX (13 حرفًا)"
    },
    phone_too_short: {
        en: "Phone number is too short. Expected 13 characters (e.g., +213781913776)",
        fr: "Le numéro de téléphone est trop court. 13 caractères attendus (ex: +213781913776)",
        ar: "رقم الهاتف قصير جدًا. يجب أن يكون 13 حرفًا (مثال: +213781913776)"
    },
    phone_too_long: {
        en: "Phone number is too long. Expected 13 characters (e.g., +213781913776)",
        fr: "Le numéro de téléphone est trop long. 13 caractères attendus (ex: +213781913776)",
        ar: "رقم الهاتف طويل جدًا. يجب أن يكون 13 حرفًا (مثال: +213781913776)"
    },

    // General Validation Errors
    required_field: {
        en: "This field is required.",
        fr: "Ce champ est obligatoire.",
        ar: "هذا الحقل مطلوب."
    },
    invalid_email: {
        en: "Please enter a valid email address.",
        fr: "Veuillez entrer une adresse email valide.",
        ar: "يرجى إدخال عنوان بريد إلكتروني صحيح."
    },

    // Network Errors
    network_error: {
        en: "Network error. Please check your internet connection.",
        fr: "Erreur réseau. Veuillez vérifier votre connexion internet.",
        ar: "خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت."
    },
    server_error: {
        en: "Server error. Please try again later.",
        fr: "Erreur serveur. Veuillez réessayer plus tard.",
        ar: "خطأ في الخادم. يرجى المحاولة لاحقًا."
    },

    // CRUD Operations
    create_success: {
        en: "Created successfully.",
        fr: "Créé avec succès.",
        ar: "تم الإنشاء بنجاح."
    },
    update_success: {
        en: "Updated successfully.",
        fr: "Mis à jour avec succès.",
        ar: "تم التحديث بنجاح."
    },
    delete_success: {
        en: "Deleted successfully.",
        fr: "Supprimé avec succès.",
        ar: "تم الحذف بنجاح."
    },
    suspend_success: {
        en: "Suspended successfully.",
        fr: "Suspendu avec succès.",
        ar: "تم التعليق بنجاح."
    },
    activate_success: {
        en: "Activated successfully.",
        fr: "Activé avec succès.",
        ar: "تم التنشيط بنجاح."
    },

    // Generic fallback
    unknown_error: {
        en: "An unexpected error occurred. Please try again.",
        fr: "Une erreur inattendue s'est produite. Veuillez réessayer.",
        ar: "حدث خطأ غير متوقع. حاول مرة أخرى."
    }
};

/**
 * Parse backend error message and return user-friendly message
 */
export function parseErrorMessage(error: string | Error, language: Language = 'en'): string {
    const errorStr = error instanceof Error ? error.message : error;
    const lowerError = errorStr.toLowerCase();

    // Check for specific error patterns
    if (lowerError.includes('deactivated') || lowerError.includes('disabled') || lowerError.includes('désactivé')) {
        return errorMessages.account_deactivated[language];
    }

    if (lowerError.includes('invalid') || lowerError.includes('incorrect') || lowerError.includes('wrong') || lowerError.includes('invalide')) {
        if (lowerError.includes('credential') || lowerError.includes('password') || lowerError.includes('email')) {
            return errorMessages.invalid_credentials[language];
        }
        if (lowerError.includes('phone') || lowerError.includes('téléphone') || lowerError.includes('telephone')) {
            return errorMessages.invalid_phone_format[language];
        }
    }

    if (lowerError.includes('not found') || lowerError.includes('no user') || lowerError.includes("doesn't exist") || lowerError.includes('introuvable')) {
        return errorMessages.account_not_found[language];
    }

    if (lowerError.includes('network') || lowerError.includes('connection') || lowerError.includes('réseau') || lowerError.includes('failed to fetch')) {
        return errorMessages.network_error[language];
    }

    if (lowerError.includes('session expired') || lowerError.includes('token expired') || lowerError.includes('unauthorized') || lowerError.includes('401')) {
        return errorMessages.session_expired[language];
    }

    if (lowerError.includes('too short') || lowerError.includes('trop court')) {
        if (lowerError.includes('phone') || lowerError.includes('téléphone')) {
            return errorMessages.phone_too_short[language];
        }
    }

    if (lowerError.includes('too long') || lowerError.includes('trop long')) {
        if (lowerError.includes('phone') || lowerError.includes('téléphone')) {
            return errorMessages.phone_too_long[language];
        }
    }

    if (lowerError.includes('required') || lowerError.includes('requis') || lowerError.includes('obligatoire')) {
        return errorMessages.required_field[language];
    }

    if (lowerError.includes('500') || lowerError.includes('server error') || lowerError.includes('internal')) {
        return errorMessages.server_error[language];
    }

    // Return generic error if no pattern matches
    return errorMessages.unknown_error[language];
}

/**
 * Get localized success message
 */
export function getSuccessMessage(type: 'create' | 'update' | 'delete' | 'suspend' | 'activate', language: Language = 'en'): string {
    const key = `${type}_success` as keyof typeof errorMessages;
    return errorMessages[key]?.[language] || errorMessages.unknown_error[language];
}

/**
 * Validate Algerian phone number format
 */
export function validatePhoneNumber(phone: string): { valid: boolean; error?: string } {
    const cleanPhone = phone.trim();

    // Algeria format: +213 followed by 9 digits = 13 total characters
    const algeriaPhoneRegex = /^\+213\d{9}$/;

    if (!cleanPhone) {
        return { valid: false, error: 'required_field' };
    }

    if (!cleanPhone.startsWith('+')) {
        return { valid: false, error: 'invalid_phone_format' };
    }

    if (cleanPhone.length < 13) {
        return { valid: false, error: 'phone_too_short' };
    }

    if (cleanPhone.length > 13) {
        return { valid: false, error: 'phone_too_long' };
    }

    if (!algeriaPhoneRegex.test(cleanPhone)) {
        return { valid: false, error: 'invalid_phone_format' };
    }

    return { valid: true };
}

export { errorMessages };
