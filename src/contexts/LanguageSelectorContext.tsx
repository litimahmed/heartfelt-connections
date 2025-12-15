import { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "ar" | "en";

interface LanguageInfo {
  code: Language;
  name: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: LanguageInfo[] = [
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇩🇿", dir: "rtl" },
  { code: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
];

interface LanguageSelectorContextType {
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  languages: LanguageInfo[];
  getCurrentLanguageInfo: () => LanguageInfo;
}

const LanguageSelectorContext = createContext<LanguageSelectorContextType | undefined>(undefined);

export function LanguageSelectorProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("fr");

  const getCurrentLanguageInfo = () => {
    return LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];
  };

  return (
    <LanguageSelectorContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguage,
        languages: LANGUAGES,
        getCurrentLanguageInfo,
      }}
    >
      {children}
    </LanguageSelectorContext.Provider>
  );
}

export function useLanguageSelector() {
  const context = useContext(LanguageSelectorContext);
  if (!context) {
    throw new Error("useLanguageSelector must be used within a LanguageSelectorProvider");
  }
  return context;
}
