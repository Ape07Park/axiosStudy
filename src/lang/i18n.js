import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationENG from "./en/translationEng.json";
import translationKO from "./ko/translationKr.json";

const resources = {
  eng: {
      translation: translationENG,
    },
    kr: {
      translation: translationKO,
    },
  };
  
  i18n.use(initReactI18next).init({
    resources,
    lng: "kr",
    fallbackLng: "eng", // 번역 파일에서 찾을 수 없는 경우 기본 언어
    interpolation: {
      escapeValue: false,
    },
  });
  
  export default i18n;