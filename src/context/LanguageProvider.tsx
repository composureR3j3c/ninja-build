import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, Language } from "@/src/i18n/translations";

type LanguageContextType = {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: keyof typeof translations.en) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    AsyncStorage.getItem("appLanguage").then((stored) => {
      if (stored === "en" || stored === "am") {
        setLangState(stored);
      }
    });
  }, []);

  const setLang = async (l: Language) => {
    setLangState(l);
    await AsyncStorage.setItem("appLanguage", l);
  };

  const t = (key: keyof typeof translations.en) =>
    translations[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};
