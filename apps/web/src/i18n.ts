import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonPT from "./locales/pt/common.json";

i18n.use(initReactI18next).init({
  resources: {
    pt: { common: commonPT },
  },
  lng: "pt",
  fallbackLng: "pt",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
