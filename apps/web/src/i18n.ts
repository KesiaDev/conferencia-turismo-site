import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonPT from "./locales/pt/common.json";
import commonEN from "./locales/en/common.json";
import commonES from "./locales/es/common.json";

// Detectar idioma do navegador ou usar localStorage
const savedLanguage = localStorage.getItem("language");
const browserLanguage = navigator.language.split("-")[0]; // 'pt-BR' -> 'pt'
const supportedLanguages = ["pt", "en", "es"];
const defaultLanguage = supportedLanguages.includes(browserLanguage) ? browserLanguage : "pt";

i18n.use(initReactI18next).init({
  resources: {
    pt: { common: commonPT },
    en: { common: commonEN },
    es: { common: commonES },
  },
  lng: savedLanguage || defaultLanguage,
  fallbackLng: "pt",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

// Salvar idioma selecionado
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
  document.documentElement.lang = lng;
});

export default i18n;
