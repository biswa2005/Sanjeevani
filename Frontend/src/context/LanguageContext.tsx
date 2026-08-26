import { createContext, useContext, useState } from "react";
import { translations, Language, T } from "@/i18n/translations";

interface LanguageCtx {
  lang: Language;
  setLang: (l: Language) => void;
  t: T;
}

const LanguageContext = createContext<LanguageCtx>({
  lang: "en",
  setLang: () => {},
  t: translations["en"],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
