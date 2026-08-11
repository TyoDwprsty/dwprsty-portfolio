"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { translations, type Lang, type TranslationKey } from "@/lib/i18n";

const STORAGE_KEY = "dwprsty_lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => translations.en[key],
});

// Lazy initializers — run synchronously on first render, no effect needed
function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "id") return saved;
  return "en";
}

function getInitialIpChecked(): boolean {
  if (typeof window === "undefined") return false;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "en" || saved === "id";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  // true if we already have a preference (no need for IP check)
  const [ipChecked, setIpChecked] = useState<boolean>(getInitialIpChecked);

  useEffect(() => {
    // Already have a preference — nothing to do
    if (ipChecked) return;

    // No preference saved — detect by IP asynchronously
    fetch("https://ipapi.co/json/", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { country_code?: string }) => {
        if (data?.country_code === "ID") {
          setLangState("id");
        }
      })
      .catch(() => {
        // silently fall back to English
      })
      .finally(() => {
        // setState inside async callback — allowed by the lint rule
        setIpChecked(true);
      });
  }, [ipChecked]);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  }, []);

  const effectiveLang: Lang = ipChecked ? lang : "en";

  const t = useCallback(
    (key: TranslationKey): string => translations[effectiveLang][key],
    [effectiveLang]
  );

  return (
    <LanguageContext.Provider value={{ lang: effectiveLang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
