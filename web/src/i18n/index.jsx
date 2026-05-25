import { createContext, useContext, useState, useEffect } from "react";
import ru from "./ru.json";
import en from "./en.json";

const translations = { ru, en };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("ru");

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved && (saved === "ru" || saved === "en")) {
      setLanguage(saved);
    }
  }, []);

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: switchLanguage,
        t: (key) => {
          const keys = key.split(".");
          let value = translations[language];
          for (const k of keys) {
            value = value?.[k];
          }
          return value || key;
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return context;
}
