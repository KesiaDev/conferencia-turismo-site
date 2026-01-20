import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonPT from "./locales/pt/common.json";
import commonEN from "./locales/en/common.json";
import commonES from "./locales/es/common.json";

// Usar idioma salvo ou português como padrão
const savedLanguage = localStorage.getItem("language");
// Sempre usar português como padrão, independente do idioma do navegador
const defaultLanguage = "pt";

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
