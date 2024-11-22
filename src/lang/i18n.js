import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en/translation.json';
import ko from './ko/translation.json';

// 저장된 언어 설정 가져오기
const savedLanguage = localStorage.getItem('language');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      ko: {
        translation: ko
      }
    },
    lng: savedLanguage || 'ko', // 저장된 언어가 있으면 사용, 없으면 ko
    fallbackLng: 'en',
    supportedLngs: ['en', 'ko'], // 지원하는 언어 명시
    interpolation: {
      escapeValue: false
    },
    debug: true,
  });

// 언어 변경 이벤트 리스너 추가
i18n.on('languageChanged', (lng) => {
  console.log('Language changed event:', lng);
});

export default i18n;