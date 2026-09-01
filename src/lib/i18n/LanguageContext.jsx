import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { ui, languages } from "./translations";
import { content } from "./content";

const LanguageContext = createContext(null);
const STORAGE_KEY = "balavan_lang";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem(STORAGE_KEY) || "en";
  });

  const changeLang = useCallback((code) => {
    setLang(code);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, code);
    }
  }, []);

  const t = useCallback(
    (key) => {
      const dict = ui[lang] || ui.en;
      return dict[key] ?? ui.en[key] ?? key;
    },
    [lang]
  );

  const tc = useCallback(
    (text) => {
      if (!text || lang === "en") return text;
      const dict = content[lang];
      if (!dict) return text;
      return dict[text] ?? text;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, changeLang, t, tc, languages }), [lang, changeLang, t, tc]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}